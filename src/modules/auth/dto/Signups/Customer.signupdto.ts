import { IsString, IsNotEmpty } from "class-validator";

import { BaseUser } from "./BaseUser";
export class CustomerDTO extends BaseUser 
{
  
  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a string' })
  State: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  City: string;

  @IsNotEmpty({ message: 'District is required' })
  @IsString({ message: 'District must be a string' })
  District: string;

  @IsNotEmpty({ message: 'Street is required' })
  @IsString({ message: 'Street must be a string' }) 
  Street: string;

  @IsNotEmpty({ message: 'House is required' })
  @IsString({ message: 'House must be a string' })
  House: string;
}

