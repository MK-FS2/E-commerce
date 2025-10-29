import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EmailRejex, PhoneRegex } from "../validation";


@Schema({timestamps:{createdAt:true,updatedAt:false},discriminatorKey:"Role"})
export class User 
{
@Prop({type:String,required:true,minLength:2,maxLength:15})
FirstName:string
@Prop({type:String,required:true,minLength:2,maxLength:15})
LastName:string
@Prop({type:String,required:true,unique:true,match:[EmailRejex,"Invalid email format"]})
Email:string
@Prop({type:String,required:true})
Password:string
@Prop({type:String,required:true,match:[PhoneRegex,"Invalid Phone format it must start with 01 and be 11 numbers longe"]})
Phone:string
@Prop({type:String,required:false})
OTP:string
@Prop({ type:Date, required: function(this:User){return!!this.OTP}})
OTPExpirationTime:Date
@Prop({type:Boolean,required:false,default:false})
isVerified:boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)





