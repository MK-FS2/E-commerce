import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


 @Schema({timestamps:{createdAt:true,updatedAt:false}})
 export class Customer 
 {
  readonly Role?:string
  FirstName:string
  LastName:string
  Email:string
  Password?:string
  Phone?:string
  OTP?:string
  OTPExpirationTime?:Date
  isVerified?:boolean
  @Prop({type:Boolean,required:true})
  UserAgent:boolean
 } 


export const CustomerSchema = SchemaFactory.createForClass( Customer )

