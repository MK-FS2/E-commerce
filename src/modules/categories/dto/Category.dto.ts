import { Category } from "@Models/Categories";
import { IsMongoId, IsNotEmpty, IsOptional, Length } from "class-validator";
import { Types } from "mongoose";



export class CategoryDTO implements Partial<Category> 
{
@IsNotEmpty({message:"CategoryName is required"})
@Length(2,35,{message:"minimum of 2 characters and maxximun of 35"})
CategoryName: string;

@IsOptional()
@IsMongoId({message:"invalied id"})
ParentCategoryID?: Types.ObjectId 
}