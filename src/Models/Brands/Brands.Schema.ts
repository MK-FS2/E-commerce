import { Category } from "@Models/Categories";
import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import {  SchemaTypes, Types } from "mongoose";
import slugify from 'slugify';

@Schema({timestamps:true})
export class Brand
{
@Prop({type:String,required:true,unique:true ,minLength:[2,"minimum of 2 characters"],maxLength:[45,"maximum of 45 characters"]})
BrandName:string
@Prop({type:FileSchema,required:false})
BrandLogo?:FileType
@Prop({type:SchemaTypes.ObjectId,required:true})
CreatedBy:Types.ObjectId
@Prop({ type: SchemaTypes.ObjectId, required: false, default:function(this:Brand) { return this.CreatedBy}})
UpdatedBy?: Types.ObjectId;
@Prop({type:String,required:true})
Description:string
@Prop({type:SchemaTypes.ObjectId,ref:"Category", required:true})
CategoryID:Types.ObjectId
}

export const BrandSchema = SchemaFactory.createForClass(Brand)

BrandSchema.post("find",async function(docs:HydratedDocument<Brand>[])
{
 for(const doc of docs)
 {
  const CategoryModel: Model<Category> = (this.getOptions() as any).CategoryModel;
  // it is a hydrated category but ts thinks other wise! so any be it for now   
  const ParentCategory:any = await CategoryModel.findOne({_id:doc.CategoryID})
 
  const Category = ParentCategory.toObject();

  const BrandSlug = slugify(doc.BrandName, { lower: false, trim: true })
  const fullSlug = Category.Slug + "-" + BrandSlug;
  (doc as any)._doc.Slug = fullSlug
 }
})