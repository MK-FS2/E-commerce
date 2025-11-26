import { IsNotEmpty, IsString } from "class-validator"



export class UpdateImageDTO 
{
 @IsNotEmpty()
 @IsString()
 ID:string


 @IsNotEmpty()
 @IsString()
 URL:string
}