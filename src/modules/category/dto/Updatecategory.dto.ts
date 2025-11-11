import { Category } from "@Models/Categories";
import {   IsMongoId, IsOptional, IsString, Length } from "class-validator";
import { Types } from "mongoose";




export class UpdateCategoryDTO implements Partial<Category> {
    @IsOptional()
    @IsString({ message: "CategoryName must be a string"})
    @Length(2, 45,{message:"CategoryName must be between 2 and 45 characters" })
    CategoryName?: string;

  
    @IsOptional()
    @IsMongoId()
    ParentCategoryID?: Types.ObjectId ;
}