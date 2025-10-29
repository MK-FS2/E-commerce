import { Schema, SchemaFactory } from "@nestjs/mongoose";



 @Schema({timestamps:{createdAt:true,updatedAt:false}})
 export class Customer 
 {
  FirstName:string
  LastName:string
  Email:string
  Password:string
  Phone:string
  OTP:string
  OTPExpirationTime:Date
  isVerified:boolean
 } 


export const CustomerSchema = SchemaFactory.createForClass( Customer )

