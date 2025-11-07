import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./Categories.Schema";
import { Model } from "mongoose";
import AbstractRepository from "@Models/Abstract.Repository";


export class CategoryRepository extends AbstractRepository<Category>
{
    constructor(@InjectModel(Category.name) CategoryModel:Model<Category>)
    {
        super(CategoryModel)
    }
}