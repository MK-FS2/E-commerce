import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";




@Schema({discriminatorKey:"Role",timestamps:{createdAt:true,updatedAt:false}})
export class Seller
{
readonly Role?:string
FirstName:string
LastName:string
Email:string
Phone:string
OTP:string
OTPExpirationTime:Date
Password:string
isVerified?:boolean
@Prop({type:String,required:true})
PrandName:string
@Prop({type:FileSchema,required:false})
profileImage?:FileType
@Prop({type:String,required:true})
TaxID:string
}


export const SellerSchema = SchemaFactory.createForClass(Seller)