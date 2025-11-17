import { FileSchema, FileType } from "@Models/Shared";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  {HydratedDocument, SchemaTypes, Types } from "mongoose";
import slugify from 'slugify';

@Schema({ timestamps: true,toJSON:{virtuals:true},toObject:{virtuals:true}})
export class Category 
{
  readonly _id?:Types.ObjectId
  @Prop({ type: SchemaTypes.ObjectId, required: true ,ref:"Admin"})
  CreatorID: Types.ObjectId;

  @Prop({ type: String, minlength: 2, maxlength: 45, required: true ,unique:true})
  CategoryName: string;

  @Prop({ type: SchemaTypes.ObjectId, ref:"Category" })
  ParentCategoryID?: Types.ObjectId;

  @Prop({ type: FileSchema, required: false })
  Image?: FileType;

  @Prop({ type: Boolean, default: true })
  Status?: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual("SubCategories",
  {
  ref:"Category",
  localField:"_id",
  foreignField:"ParentCategoryID"
})

CategorySchema.post("find", async function(docs: HydratedDocument<Category>[]) {
  for (const doc of docs) 
    {
      // this is the base start
    let fullSlug = slugify(doc.CategoryName, { lower: false, trim: true });
    let parentId = doc.ParentCategoryID;

    // if no parent it will kust return base start as parentId will be undefind
    while (parentId) 
    {
      //  will find the parent if yes append on base slug if no break return the slug 
      const parent:HydratedDocument<Category>|null = await this.model.findById(parentId)
      if (!parent) break;
      fullSlug = `${slugify(parent.CategoryName, { lower: false, trim: true })}-${fullSlug}`;
      parentId = parent.ParentCategoryID; 
    }
    (doc as any)._doc.Slug = fullSlug;
  }
});

CategorySchema.post("findOne", async function(doc: HydratedDocument<Category> | null) {
  if (!doc || !doc.CategoryName) return; 

  let fullSlug = slugify(String(doc.CategoryName), { lower: false, trim: true });
  let parentId = doc.ParentCategoryID;

  while (parentId) {
    const parent: HydratedDocument<Category> | null = await this.model.findById(parentId);
    if (!parent || !parent.CategoryName) break; // skip if no parent or parent name missing
    fullSlug = `${slugify(String(parent.CategoryName), { lower: false, trim: true })}-${fullSlug}`;
    parentId = parent.ParentCategoryID;
  }
  (doc as any)._doc.Slug = fullSlug;
});