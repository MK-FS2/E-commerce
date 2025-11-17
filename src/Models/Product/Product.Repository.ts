import { BrandRepository } from './../Brands/Brands.Repository';
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./Product.Schema";
import AbstractRepository from "@Models/Abstract.Repository";
import {Model, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import slugify from "slugify";




export class ProductRepository extends AbstractRepository<Product>
{
    constructor(@InjectModel(Product.name) private readonly ProductModel:Model<Product>, private readonly brandRepository:BrandRepository)
    {
        super(ProductModel)
    }

async GetOne(Filter: RootFilterQuery<Product>,Projection?: ProjectionType<Product>,Options?: QueryOptions<Product>) {
  const doc = await this.FindOne(Filter, Projection, Options);
  if (!doc) return null;
  let Doc:any
  const BaseSlug = slugify(doc.ProductName, { lower: false, trim: true });
  const Parent = await this.brandRepository.GetOne({ _id: doc.Brand });

  if (Parent) 
  {
    const BrandSlug = (Parent as any).Slug ?? slugify(Parent.BrandName, { lower: false, trim: true });
     Doc = doc.toObject();
    Doc.Slug = `${BrandSlug}-${BaseSlug}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Doc;
}

async GetMany(Filter: RootFilterQuery<Product>,Projection?: ProjectionType<Product>,Options?: QueryOptions<Product>) {
  const docs = await this.Find(Filter, Projection, Options);
  if (!docs) return [];

  const results:any[] = [];

  for (const doc of docs) 
  {
    const BaseSlug = slugify(doc.ProductName, { lower: false, trim: true });

    const ParentBrand = await this.brandRepository.GetOne({ _id: doc.Brand });
    if (!ParentBrand) continue; 
    const BrandSlug = (ParentBrand as any).Slug ?? slugify(ParentBrand.BrandName, { lower: false, trim: true });
    const Doc = doc.toObject();
    (Doc as any).Slug = `${BrandSlug}-${BaseSlug}`;
    results.push(Doc);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return results;
}

}