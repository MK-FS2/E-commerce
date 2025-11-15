import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

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
    SubVariants:BaseVariant[]

} 
export const VariantsSchema = SchemaFactory.createForClass(Variants)


@Schema()
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

@Prop({type:SchemaTypes.ObjectId})
UpdatedBy:Types.ObjectId

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
DiscounstAmount:number

@Prop({type:String,enum:DiscountTypes,required:false})
DiscountType:DiscountTypes


@Prop({type:Number,required:false,default:0})
SoldAmount:number


@Prop({type:[RatingInfoSchema],required:false})
CustomerRating:RatingInfo[]

// temporary not required
@Prop({type:FileSchema,required:false})
CoverImage?:FileType

@Prop({type:[FileSchema],required:false})
ProductImages?:FileType[]

@Prop({type:[VariantsSchema],required:false})
Variants:Variants[]

@Prop({type:Boolean,default:false})
DiscountStatus:boolean
}
// slug calculated 
// totalstock calculated ,
// final price calculated
// total rating will be calculated



export const ProductSchema = SchemaFactory.createForClass(Product)
