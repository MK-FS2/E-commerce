import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Types } from "mongoose";
import { IsValidDiscount} from "./AddProduct.dto";
import { DiscountTypes } from "@Models/Product";




export class UpdateProductDTO 
{

  @IsString()
  @IsOptional()
  ProductName: string;

  @IsString()
  @IsOptional()
  @MinLength(2,{ message: "Description must be at least 2 characters long" })
  @MaxLength(400,{ message: "Description must be at most 400 characters long" })
  Description: string;

  @IsOptional()
  @IsMongoId({ message: "Category must be a valid MongoDB ObjectId" })
  Category: Types.ObjectId;


  @IsOptional()
  @IsMongoId({ message: "Brand must be a valid MongoDB ObjectId" })
  Brand: Types.ObjectId;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  Price: number;


  @IsOptional()
  @IsNumber()
  @IsValidDiscount({ message: "Discount amount is invalid based on discount type" })
  DiscounstAmount: number;


  @IsOptional()
  @IsEnum(DiscountTypes, { message: "DiscountType must be '%' or '$'" })
  DiscountType: DiscountTypes;
  
  @IsBoolean()
  @IsOptional()
  Productstatus?: boolean 

  @IsBoolean()
  @IsOptional()
  DiscountStatus:boolean

}