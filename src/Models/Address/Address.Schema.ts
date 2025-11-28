import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: false, _id: true })
export class Address {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  UserID: Types.ObjectId;

  @Prop({ type: String,required:true,minlength:2,maxlength:100})
  State: string;

  @Prop({ type: String,required:true,minlength:2,maxlength:100})
  City: string;

  @Prop({ type: String,required:true,minlength:2,maxlength:100})
  District: string;

  @Prop({ type: String,required:true,minlength:2,maxlength:100})
  Street: string;

  @Prop({ type: String,required:true,minlength:2,maxlength:100})
  House: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
