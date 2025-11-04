import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EmailRegex} from "./validation";


@Schema({timestamps:{createdAt:true,updatedAt:false},discriminatorKey:"Role"})
export class User 
{
readonly Role?:string
@Prop({type:String,required:true,minLength:2,maxLength:15})
FirstName:string
@Prop({type:String,required:true,minLength:2,maxLength:15})
LastName:string
@Prop({type:String,required:true,unique:true,match:[EmailRegex,"Invalid email format"]})
Email:string
@Prop({ type: String, required: function () { return this.UserAgent === true; } })
Password?: string;
@Prop({type:String,required: function () { return this.UserAgent === true;}})
Phone?:string
@Prop({type:String,required:false})
OTP?:string
@Prop({ type:Date, required: function(this:User){return!!this.OTP}})
OTPExpirationTime?:Date
@Prop({type:Boolean,required:false,default:false})
isVerified:boolean;
@Prop({type:Boolean,required:true})
UserAgent:boolean
}

export const UserSchema = SchemaFactory.createForClass(User)





