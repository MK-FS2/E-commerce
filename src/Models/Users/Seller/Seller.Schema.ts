import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { SpecialisationTypes } from "../../Shared/Enums";
import { FileSchema, FileType } from "../../Shared/Schemas";


@Schema({discriminatorKey:"Role",timestamps:{createdAt:true,updatedAt:false}})
export class Seller
{
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
@Prop({type:[String],enum:SpecialisationTypes, required: true })
productSpecialisation:SpecialisationTypes[];
@Prop({type:FileSchema,required:false})
profileImage?:FileType
@Prop({type:String,required:true})
TaxID:string
}


export const SellerSchema = SchemaFactory.createForClass(Seller)