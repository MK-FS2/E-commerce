import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class  UpdateAddressDTO
{

      @IsNotEmpty()
      @IsString()
      @Length(2,200)
      @IsOptional()
      House: string;
    
      @IsNotEmpty()
      @IsString()
      @Length(2, 100)
      @IsOptional()
      State: string;
    
      @IsNotEmpty()
      @IsString()
      @Length(2,100)
      @IsOptional()
      District: string;
    
      @IsNotEmpty()
      @IsString()
      @Length(2,100)
      @IsOptional()
      Street: string;
    
      @IsNotEmpty()
      @IsString()
      @Length(2,100)
      @IsOptional()
      City: string;
}