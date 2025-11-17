import { DiscountTypes, Product, Variants } from "@Models/Product";
import { Types } from "mongoose";

export class ProductEntity implements Partial<Product> 
{
ProductName: string 
Description: string 
Brand:Types.ObjectId 
Category:Types.ObjectId 
DiscounstAmount?: number | undefined;
DiscountType?: DiscountTypes | undefined;
CreatedBy: Types.ObjectId 
Productstatus?: boolean | undefined;
Variants: Variants[] 
Price: number 
DiscountStatus?: boolean | undefined;
}