import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./Product.Schema";
import AbstractRepository from "@Models/Abstract.Repository";
import { HydratedDocument, Model, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import { Brand } from "@Models/Brands";
import { Category } from "@Models/Categories";



export class ProductRepository extends AbstractRepository<Product>
{
    constructor(@InjectModel(Product.name) private readonly ProductModel:Model<Product>,@InjectModel(Brand.name) private readonly BrandModel:Model<Brand>,@InjectModel(Category.name) private readonly CategoryModel:Model<Category> )
    {
        super(ProductModel)
    }

async FindOneProductCustom(filter: RootFilterQuery<Product>, projection?: ProjectionType<Product>, options?: QueryOptions<Product>) 
{
    const product: HydratedDocument<Product> | null = await (this.ProductModel as any).findOneProduct({ filter, BrandModel: this.BrandModel, CategoryModel: this.CategoryModel, Options: options, Projection: projection });
    return product;
}

}