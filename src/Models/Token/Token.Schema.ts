import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema()
export class Token 
{
@Prop({type:String,required:true})
accestoken:string
@Prop({type:String,required:true})
refreashtoken:string
@Prop({type:SchemaTypes.ObjectId,required:true,ref:"User"})
UserID:Types.ObjectId
}

export const TokenSchema = SchemaFactory.createForClass(Token) 