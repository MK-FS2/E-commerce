import {IsBoolean,IsNumber,IsOptional,IsString,Min, MinLength} from "class-validator";



export class UpdateVariantDTO 
{
    @IsOptional()
    @IsString()
    @MinLength(2)
    Variantname: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    VariantStock: number;
  
    @IsOptional()
    @IsBoolean()
    Variantstatus: boolean;
}