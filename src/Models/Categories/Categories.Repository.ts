import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./Categories.Schema";
import { Model, Types } from "mongoose";
import AbstractRepository from "@Models/Abstract.Repository";
import { Brand } from "@Models/Brands";
import { Product } from "@Models/Product";


export class CategoryRepository extends AbstractRepository<Category>
{
    constructor(@InjectModel(Category.name) private readonly categoryModel:Model<Category>,@InjectModel(Brand.name) private readonly brandModel:Model<Brand>,@InjectModel(Product.name) private readonly productModel:Model<Product>)
    {
        super(categoryModel)
    }

    async DeleteOnecategory(CategoryID:Types.ObjectId)
    {
     const Result = await this.DeleteOne({_id:CategoryID})
      if(!Result)
      {
        return false
      }
      await this.brandModel.deleteMany({CategoryID:CategoryID})
      await this.productModel.deleteMany({Category:CategoryID})

      return true
    }
}