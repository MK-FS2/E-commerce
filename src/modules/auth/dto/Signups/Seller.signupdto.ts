import {IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseUser } from "./BaseUser";



export class SellerDTO extends BaseUser
{

  @IsString({ message: 'Tax ID must be a string' })
  @IsNotEmpty({ message: 'Tax ID is required' })
  @MinLength(5,{message:'Invalid format it must be exacly 5 charcters i'})
  @MaxLength(5,{message:'Invalid format it must be exacly 5 charcters i'})
  TaxID:string ; 
}