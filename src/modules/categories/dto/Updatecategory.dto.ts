import { Category } from "@Models/Categories";
import { Optional } from "@nestjs/common";
import {   IsString } from "class-validator";
import { Types } from "mongoose";




export class UpdateCategoryDTO implements Partial<Category> {
    @Optional()
    @IsString()
    CategoryName?: string | undefined;

  
    @Optional()

    ParentCategoryID?: Types.ObjectId | undefined;
}