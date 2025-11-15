import AbstractRepository from "@Models/Abstract.Repository";
import { Brand } from "./Brands.Schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Category } from "@Models/Categories";



export class BrandRepository extends AbstractRepository<Brand>
{
constructor(@InjectModel(Brand.name) private readonly BrandModel:Model<Brand>,@InjectModel(Category.name) private readonly CategoryModel:Model<Category>)
{
    super(BrandModel)
}
// true mean public false mean authourised
async GetAll(Page:number, Limit:number) 
{
  const Skip = (Page - 1) * Limit;

  const Brands = await this.BrandModel.find({}, {}, {skip: Skip,limit:Limit,populate:[{path:"CategoryID",populate:{path:"CreatorID",select:'_id FirstName Email'}},{path:"CreatedBy",select:'_id FirstName Email'},{path:"UpdatedBy",select:'_id FirstName Email'}]}).setOptions({ CategoryModel: this.CategoryModel });
  
  return Brands;
}

async GetOne(BrandID:Types.ObjectId,Bypass?:boolean)
{
const Brand = await this.BrandModel.findOne({_id:BrandID},{},{populate:[{path:"CategoryID",populate:{path:"CreatorID",select:'_id FirstName Email'}},{path:"CreatedBy",select:'_id FirstName Email'},{path:"UpdatedBy",select:'_id FirstName Email'}]}).setOptions({ CategoryModel: this.CategoryModel,Bybass:Bypass});
return Brand
}

}