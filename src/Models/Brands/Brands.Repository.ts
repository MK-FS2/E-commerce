import AbstractRepository from "@Models/Abstract.Repository";
import { Brand } from "./Brands.Schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "@Models/Categories";



export class BrandRepository extends AbstractRepository<Brand>
{
constructor(@InjectModel(Brand.name) private readonly BrandModel:Model<Brand>,@InjectModel(Category.name) private readonly CategoryModel:Model<Category>)
{
    super(BrandModel)
}

async GetAll()
{
     //so i can acces the categorymodel later in the hook
    const Brands = await this.BrandModel.find({}).setOptions({CategoryModel:this.CategoryModel});

    if(Brands.length > 0)
    {
     return Brands
    }
    else 
    {
        return []
    }
}

}