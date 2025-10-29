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
isVerified:boolean
@Prop({type:String,required:true})
CompanyName:string
@Prop({type:String,enum:SpecialisationTypes,required:true})
specialisation: SpecialisationTypes;
@Prop({type:FileSchema,required:true})
profileImage:FileType
@Prop({type:String,required:true,minLength:[5,"Minimum of 5 caharcters"],maxLength:[5,"Maximum of 5 caharcters"]})
TaxID:string
}


export const SellerSchema = SchemaFactory.createForClass(Seller)