import { Brand } from "@Models/Brands";
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class UpdateBrandDTO implements Partial<Brand> 
{
  @IsOptional()
  @IsNotEmpty({ message: 'Brand name is required.' })
  @IsString({ message: 'Brand name must be a string.' })
  @MinLength(2, { message: 'Brand name must be at least 2 characters long.' })
  @MaxLength(45, { message: 'Brand name must be no more than 45 characters long.' })
  BrandName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  Description?: string;


  @IsOptional()
  @IsMongoId()
  CategoryID?: Types.ObjectId 
}
