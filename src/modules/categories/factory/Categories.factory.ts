import { UpdateCategoryDTO } from './../dto/Updatecategory.dto';
import { Types } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "../dto";
import { CategoryEntity } from "../entity";
import slugify from 'slugify';




@Injectable()
export class CategoryFactory
{

CreatCategory(categoryDTO:CategoryDTO,User:{_id:Types.ObjectId},Parentslug:string):CategoryEntity
{
   const category = new CategoryEntity()
   
   category.CategoryName = categoryDTO.CategoryName
   category.CreatorID = User._id
   if(categoryDTO.ParentCategoryID) 
   {
    category.ParentCategoryID = categoryDTO.ParentCategoryID
    category.Slug = Parentslug +"-"+ slugify(categoryDTO.CategoryName,{lower:true})
   }
   else 
   {
    category.ParentCategoryID = undefined
    category.Slug = slugify(categoryDTO.CategoryName,{lower:true})
   }
  return category
}

UpdateCategory(updateCategoryDTO: UpdateCategoryDTO, UserID: Types.ObjectId, parentSlug?: string) {
    const category = new CategoryEntity();

    if (updateCategoryDTO.CategoryName)
    {
        category.CategoryName = updateCategoryDTO.CategoryName;
        const childSlug = slugify(updateCategoryDTO.CategoryName, { lower: true });
        category.Slug = parentSlug ? `${parentSlug}-${childSlug}` : childSlug;
    }

    category.CreatorID = UserID;
    category.ParentCategoryID = updateCategoryDTO.ParentCategoryID;

    return category;
}
}