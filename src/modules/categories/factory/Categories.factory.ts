import { Types } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "../dto";
import { CategoryEntity } from "../entity";
import slugify from 'slugify';




@Injectable()
export class CategoryFactory
{

CreatCategory(categoryDTO:CategoryDTO,User:{_id:Types.ObjectId}):CategoryEntity
{
   const category = new CategoryEntity()
   
   category.CategoryName = categoryDTO.CategoryName
   category.Slug = slugify(categoryDTO.CategoryName,{lower:true})
   category.CreatorID = User._id
   if(category.ParentCategoryID) 
   {
    category.ParentCategoryID = categoryDTO.ParentCategoryID
   }
  return category
}


}