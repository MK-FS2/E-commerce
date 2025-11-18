
import {IsString,IsNotEmpty,IsNumber,Min,IsEnum,IsOptional,IsMongoId,IsArray,ValidateNested,registerDecorator,ValidationOptions,ValidationArguments,IsBoolean, MinLength, MaxLength,} from "class-validator";
import { DiscountTypes } from "@Models/Product";
import { Types } from "mongoose";


export function IsValidDiscount(validationOptions?: ValidationOptions) 
{
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) 
  {
    registerDecorator(
    {
      name: "isValidDiscount",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: 
      {
        validate(value: any, args: ValidationArguments) 
        {
          const obj = args.object as any;
          const discountType: DiscountTypes = obj.DiscountType;
          const price: number = obj.Price;

          if (discountType === DiscountTypes.Precentage) 
          {
            return typeof value === "number" && value >= 0 && value <= 100;
          }

          if (discountType === DiscountTypes.Discreat)
         {
            return typeof value === "number" && value >= 0 && price != null && value <= price;
          }

          return true; 
        },
        defaultMessage(args: ValidationArguments) 
        {
          const obj = args.object as any;
          const discountType: DiscountTypes = obj.DiscountType;

          if (discountType === DiscountTypes.Precentage) {
            return "Percentage discount must be between 0 and 100";
          }

          if (discountType === DiscountTypes.Discreat) {
            return "Fixed discount must be between 0 and product price";
          }

          return "Invalid discount amount";
        },
      },
    });
  };
}


export class BaseVariantDTO 
{
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  Variantname: string 

  @IsNumber()
  @Min(0)
  VariantStock: number;

  @IsBoolean()
  @IsNotEmpty({ message: "Variantstatus is required" })
  Variantstatus: boolean;
}

export class VariantDTO 
{
  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  Variantname: string 

  @IsNumber()
  @Min(0)
  VariantStock: number;

  @IsBoolean()
  @IsNotEmpty({ message: "Variantstatus is required" })
  Variantstatus: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  SubVariants?: BaseVariantDTO[];
}


export class AddProductDTO 
{
  @IsString()
  @IsNotEmpty()
  ProductName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "Description must be at least 2 characters long" })
  @MaxLength(400, { message: "Description must be at most 400 characters long" })
  Description: string;

  @IsMongoId({ message: "Category must be a valid MongoDB ObjectId" })
  Category: Types.ObjectId;

  @IsMongoId({ message: "Brand must be a valid MongoDB ObjectId" })
  Brand: Types.ObjectId;

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


  @IsArray()
  @ValidateNested({ each: true })
  Variants: VariantDTO[];

  
  @IsOptional()
  DiscountStatus?: boolean;
}
