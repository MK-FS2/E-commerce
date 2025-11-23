import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:{createdAt:true,updatedAt:false}})
export class CartProduct 
{
@Prop({type:SchemaTypes.ObjectId,required:true})
ProductID:Types.ObjectId

@Prop({type:SchemaTypes.ObjectId,required:true})
VariantID:Types.ObjectId

@Prop({type:Number,required:false,default:1})
Quantity:number
}


@Schema()
export class Cart 
{
@Prop({type:SchemaTypes.ObjectId,required:true}) 
UserID:Types.ObjectId

@Prop({type:[CartProduct],required:false})
CartProducts?:CartProduct[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)