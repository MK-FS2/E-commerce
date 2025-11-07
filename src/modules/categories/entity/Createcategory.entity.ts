import { Category } from "@Models/Categories";
import { Types } from "mongoose";



export class CategoryEntity implements Category
{
CreatorID: Types.ObjectId;
CategoryName: string;
Slug: string;
ParentCategoryID?: Types.ObjectId | undefined;
}