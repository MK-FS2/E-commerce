import AbstractRepository from "@Models/Abstract.Repository";
import { InjectModel } from "@nestjs/mongoose";
import {  Model, ProjectionType, QueryOptions, RootFilterQuery} from "mongoose";
import { Category } from "./../Categories/Categories.Schema"
import slugify from "slugify";
import { Brand } from "./Brands.Schema";



export class BrandRepository extends AbstractRepository<Brand>
{
constructor(@InjectModel(Brand.name) private readonly BrandModel:Model<Brand>,@InjectModel(Category.name) private readonly CategoryModel:Model<Category>)
{
    super(BrandModel)
}

async GetAll(Filter: RootFilterQuery<Brand>, Projection: ProjectionType<Brand>,Options:QueryOptions<Brand>) 
{
    const docs = await this.Find(Filter, Projection,Options);

    if (!docs || docs.length === 0) return [];

    const result: any[] = [];

    for (const doc of docs) 
    {
        const ParentCategory: any = await this.CategoryModel.findOne({ _id: doc.CategoryID });
        if (!ParentCategory) continue;

        const Category = ParentCategory.toObject();
        const BrandSlug = slugify(doc.BrandName, { lower: false, trim: true });
        const fullSlug = `${Category.Slug}-${BrandSlug}`;
        
        const Doc = doc.toObject();

        (Doc as any).Slug = fullSlug;
        result.push(Doc);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
}

async GetOne(Filter: RootFilterQuery<Brand>,Projection?: ProjectionType<Brand>,Options?: QueryOptions<Brand>) 
{
  const doc = await this.FindOne(Filter, Projection, Options);
  if (!doc) return null;
  const ParentCategory = await this.CategoryModel.findOne({ _id: doc.CategoryID });
  if (!ParentCategory) return null;
  const Category:any = ParentCategory.toObject();
  const BrandSlug = slugify(doc.BrandName, { lower: false, trim: true });
  const fullSlug = `${Category.Slug}-${BrandSlug}`;
  
  const Doc = doc.toObject();

  (Doc as any).Slug = fullSlug;
  return Doc;
}



}