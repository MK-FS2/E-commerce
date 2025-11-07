import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../common";

@Schema({timestamps:{createdAt:true,updatedAt:false}})
export class Admin implements Partial<User>
{
FirstName:string 
LastName:string 
Email:string 
Phone:string 
OTP?: string 
OTPExpirationTime?:Date 
isVerified?: boolean 
}

export const AdminSchema = SchemaFactory.createForClass(Admin)