import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: false, _id: true })
export class Address 
{
  @Prop({ required: true })
  State: string;

  @Prop({ required: true })
  City: string;

  @Prop({ required: true })
  District: string;

  @Prop({ required: true })
  Street: string;

  @Prop({ required: true })
  House: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address)





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
  @Prop({ type: AddressSchema, required: function() {return this.Agent === true;}})
  Address?:Address 
  UserAgent:boolean
 } 


export const CustomerSchema = SchemaFactory.createForClass( Customer )

