import { Brand } from "@Models/Brands";
import { Category } from "@Models/Categories";
import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model, ProjectionType, QueryOptions, RootFilterQuery, SchemaTypes, Types } from "mongoose";
import slugify from 'slugify';


export enum DiscountTypes 
{
    Precentage ="%",
    Discreat ="$"
}


@Schema()
export class RatingInfo
{
@Prop({type:SchemaTypes.ObjectId,ref:"Customer",required:true})
Rater:Types.ObjectId
@Prop({type:String,required:false,minLength:5,maxlength:200})
Description:string
@Prop({type:Number,min:1,max:5,required:true})
Rating:number
}

@Schema()
export class BaseVariant 
{
    @Prop({type:SchemaTypes.Mixed, required:true})
    Variantname:string|number

    @Prop({type:Number,min:0,default:0})
    VariantStock:number 
     
    @Prop({type:Boolean,required:true,default:function()
    {
     if(this.VariantStock === 0)
     {
        // as out of stock
        return false 
     }
     else 
     {
        return true
     }
    }
    })
    Variantstatus:boolean

}

@Schema()
export class Variants 
{
    @Prop({type:SchemaTypes.Mixed, required:true})
    Variantname:string|number
    
    @Prop({type:Number,min:0,default:0})
    VariantStock:number 
    

    @Prop({type:Boolean,required:true,default:function()
    {
     if(this.VariantStock === 0)
     {
        // as out of stock
        return false 
     }
     else 
     {
        return true
     }
    }
    })
    Variantstatus:boolean

    @Prop({type:[BaseVariant],required:false})
    SubVariants?:BaseVariant[]

} 



@Schema({timestamps:true ,toObject:{virtuals:true},toJSON:{virtuals:true}})
export class Product
{
@Prop({type:String,required:true})
ProductName:string

@Prop({type:Number,min:0,required:true})
Price:number

@Prop({type:String,required:true,minLength:2,maxLength:400})
Description:string


@Prop({type:SchemaTypes.ObjectId,required:true})
Brand:Types.ObjectId

@Prop({type:SchemaTypes.ObjectId,required:true})
Category:Types.ObjectId

@Prop({type:SchemaTypes.ObjectId})
CreatedBy:Types.ObjectId


@Prop({type:Number,required:false,default:0,
  validate: 
  {
    validator: function (value: number) 
    {
      if (!this.DiscountType) return true; 

      if (this.DiscountType === "%") 
      {
        return value >= 0 && value <= 100;
      }

      if (this.DiscountType === "$") 
      {
        return value >= 0 && value <= this.Price;
      }
      return true;
    },
    message: "Invalid discount amount",
  },
})
DiscounstAmount?:number

@Prop({type:String,enum:DiscountTypes,required:function(){
    if(this.DiscounstAmount)
    {
        return true
    }
    else 
    {
        return false
    }
}})
DiscountType?:DiscountTypes

@Prop({type:Number,required:false,default:0})
SoldAmount?:number

@Prop({type:[RatingInfo],required:false})
CustomerRating?:RatingInfo[]

// temporary not required
@Prop({type:FileSchema,required:false})
CoverImage?:FileType

@Prop({type:[FileSchema],required:false})
ProductImages?:FileType[]

@Prop({type:[Variants],required:true})
Variants:Variants[]

@Prop({type:Boolean,default:false})
DiscountStatus?:boolean

@Prop({type:Boolean,default:true})
Productstatus?:boolean
}

// totalstock calculated,
// *****************************
// refactor the previosly refactord nested hook so it is a custom static spesfic mongoose methode to remove the need for a bypass in normal logic


export const ProductSchema = SchemaFactory.createForClass(Product)



ProductSchema.statics.findOneProduct = async function(params: { filter: RootFilterQuery<Product>, BrandModel: Model<Brand>, CategoryModel: Model<Category>, Options?: QueryOptions<Product>, Projection?: ProjectionType<Product> }) {
    const { filter, BrandModel, CategoryModel, Options, Projection } = params;
    const doc: HydratedDocument<Product> | null = await this.findOne(filter, Projection, Options);
    if (!doc) return null;
    const BaseSlug = slugify(doc.ProductName, { lower: false, trim: true });
    const Parent = await BrandModel.findOne({ _id: doc.Brand }).setOptions({ CategoryModel });
    const  result = doc.toObject(); 
    if (Parent) 
    {
      const Casted = Parent.toObject();
     (result as any).Slug = Casted.Slug + "-" + BaseSlug;
    }
    return result;
};

ProductSchema.statics.findManyProducts = async function(params: { filter: RootFilterQuery<Product>,Page:number,Limit:number,BrandModel: Model<Brand>,CategoryModel: Model<Category>,Options?: QueryOptions<Product>,Projection?: ProjectionType<Product>}) {
  const { filter, BrandModel, CategoryModel, Options, Projection, Page,Limit } = params;
  const Skip = Math.ceil((Page-1)*Limit)

  const docs: HydratedDocument<Product>[] = await this.find(filter, Projection, Options).skip(Skip).limit(Limit)
    console.log(docs)
   const results: Array<Product & { Slug?:string }> = [];

    for (const doc of docs) 
    {
      const BaseSlug = slugify(doc.ProductName, { lower: false, trim: true });
      const Parent = await BrandModel.findOne({ _id: doc.Brand }).setOptions({ CategoryModel });
      const result = doc.toObject();
      if (Parent) 
      {
        const Casted = Parent.toObject();
        (result as any).Slug = Casted.Slug + "-" + BaseSlug;
      }
        results.push(result);
    }
    return results;
};

ProductSchema.virtual("FinaPrice").get(function(this:Product)
{
// final price calculated
 return this.Price - (this.DiscounstAmount || 0)
})

ProductSchema.virtual("Rating").get(function (this:Product) 
{
  const ratings = this.CustomerRating || [];
  if (ratings.length === 0) return 0;

  const total = ratings.reduce((sum, r) => sum + r.Rating, 0);
  const average = total / ratings.length;
  return average;
});

ProductSchema.virtual("TotalStock").get(function (this: Product) {
  const variants = this.Variants || [];
  let totalStock = 0;

  for (const variant of variants) 
  {
    totalStock += variant.VariantStock || 0;

    if (variant.SubVariants && variant.SubVariants.length > 0) 
    {
     for(const subVariant of variant.SubVariants) 
      {
        totalStock += subVariant.VariantStock || 0;
      }
    }
  }

  return totalStock;
});
