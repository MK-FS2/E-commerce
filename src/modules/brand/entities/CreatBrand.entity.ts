import { Brand } from "@Models/Brands";
import { Types } from "mongoose";

export class CreateBrandEntity implements Partial<Brand>
{
BrandName: string 
Description:string
CategoryID:Types.ObjectId
CreatedBy: Types.ObjectId 
}