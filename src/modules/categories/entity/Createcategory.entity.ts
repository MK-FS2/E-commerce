import { Category } from "@Models/Categories";
import { Types } from "mongoose";



export class CategoryEntity implements Category
{
CreatorID: Types.ObjectId;
CategoryName: string;
ParentCategoryID?: Types.ObjectId | undefined;
}