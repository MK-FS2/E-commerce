import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  CreatorID: Types.ObjectId;

  @Prop({ type: String, minlength: 2, maxlength: 45, required: true })
  CategoryName: string;

  @Prop({ type: String, required: true, unique: true })
  Slug: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "Category" })
  ParentCategoryID?: Types.ObjectId;

  @Prop({ type: FileSchema, required: false })
  Image?: FileType;

  @Prop({ type: Boolean, default: true })
  Status?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
