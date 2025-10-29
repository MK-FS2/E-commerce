import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps:{createdAt:true,updatedAt:false},discriminatorKey:"Role"})
export class User 
{
@Prop()
FirstName:string
@Prop()
LastName:string
@Prop()
Email:string
@Prop()
Phone:string
}






export const UserSchema = SchemaFactory.createForClass(User)