import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./Product.Schema";
import AbstractRepository from "@Models/Abstract.Repository";
import { Model } from "mongoose";



export class ProductRepository extends AbstractRepository<Product>
{
    constructor(@InjectModel(Product.name) ProductModel:Model<Product>)
    {
        super(ProductModel)
    }
}