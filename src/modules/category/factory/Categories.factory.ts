import { UpdateCategoryDTO } from '../dto/Updatecategory.dto';
import { Types } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "../dto";
import { CategoryEntity } from "../entity";





@Injectable()
export class CategoryFactory
{

CreatCategory(categoryDTO:CategoryDTO,User:{_id:Types.ObjectId}):CategoryEntity
{
   const category = new CategoryEntity()
   
   category.CategoryName = categoryDTO.CategoryName
   category.CreatorID = User._id
   if(categoryDTO.ParentCategoryID) 
   {
    category.ParentCategoryID = categoryDTO.ParentCategoryID
   }
   else 
   {
    category.ParentCategoryID = undefined
   }
  return category
}

UpdateCategory(updateCategoryDTO: UpdateCategoryDTO, UserID: Types.ObjectId) {
    const category = new CategoryEntity();

    if (updateCategoryDTO.CategoryName)
    {
        category.CategoryName = updateCategoryDTO.CategoryName;
    }

    category.CreatorID = UserID;
    category.ParentCategoryID = updateCategoryDTO.ParentCategoryID;

    return category;
}
}