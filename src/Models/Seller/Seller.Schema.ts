import { Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({discriminatorKey:"Role",timestamps:{createdAt:true,updatedAt:false}})
export class Seller
{
FirstName:string
LastName:string
Email:string
Phone:string
}


export const SellerSchema = SchemaFactory.createForClass(Seller)