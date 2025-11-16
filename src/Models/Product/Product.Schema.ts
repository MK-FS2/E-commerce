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
export const RatingInfoSchema = SchemaFactory.createForClass(RatingInfo)



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
export const BaseVariantSchema = SchemaFactory.createForClass(BaseVariant)


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

    @Prop({type:[BaseVariantSchema],required:false})
    SubVariants?:BaseVariant[]

} 
export const VariantsSchema = SchemaFactory.createForClass(Variants)


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


@Prop({type:[RatingInfoSchema],required:false})
CustomerRating?:RatingInfo[]

// temporary not required
@Prop({type:FileSchema,required:false})
CoverImage?:FileType

@Prop({type:[FileSchema],required:false})
ProductImages?:FileType[]

@Prop({type:[VariantsSchema],required:true})
Variants:Variants[]

@Prop({type:Boolean,default:false})
DiscountStatus?:boolean

@Prop({type:Boolean,default:true})
Productstatus?:boolean

}
// slug calculated 
// totalstock calculated,
// total rating will be calculated


// *****************************
// refactor the previosly refactord nested hook so it is a custom static spesfic mongoose methode to remove the need for a bypass in normal logic


export const ProductSchema = SchemaFactory.createForClass(Product)


ProductSchema.statics.findOneProduct = async function(params: { filter: RootFilterQuery<Product>, BrandModel: Model<Brand>, CategoryModel: Model<Category>, Options?: QueryOptions<Product>, Projection?: ProjectionType<Product> }) {
    const { filter, BrandModel, CategoryModel, Options, Projection } = params;
    const doc: HydratedDocument<Product> | null = await this.findOne(filter, Projection, Options).setOptions({ BrandModel, CategoryModel });
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



ProductSchema.virtual("FinaPrice").get(function(this:Product)
{
// final price calculated
 return this.Price - (this.DiscounstAmount || 0)
})

