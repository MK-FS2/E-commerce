import { IsNotEmpty, IsNumber, Min } from "class-validator";


export class AddTocartDTO 
{
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    Quantity:number
}