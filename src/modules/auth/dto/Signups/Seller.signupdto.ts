import {IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseUser } from "./BaseUser";



export class SellerDTO extends BaseUser
{

  @IsString({ message: 'Tax ID must be a string' })
  @IsNotEmpty({ message: 'Tax ID is required' })
  @MinLength(5,{message:'Invalid format it must be exacly 5 charcters i'})
  @MaxLength(5,{message:'Invalid format it must be exacly 5 charcters i'})
  TaxID:string ; 

  @IsString({message:"Invalid PrandName format"})
  @IsNotEmpty({ message: 'PrandName is required' })
  @MinLength(2,{message:'Invalid PrandName minimum 2 characters format '})
  @MaxLength(25,{message:'Invalid PrandName maximum 25 characters format'})
  PrandName:string
}