import AbstractRepository from "@Models/Abstract.Repository";
import { Brand } from "./Brands.Schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";



export class BrandRepository extends AbstractRepository<Brand>
{
constructor(@InjectModel(Brand.name) BrandModel:Model<Brand>)
{
    super(BrandModel)
}
}