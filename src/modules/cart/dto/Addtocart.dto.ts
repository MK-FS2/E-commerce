import { IsNumber, Min } from "class-validator";


export class AddTocartDTO 
{
    @IsNumber()
    @Min(0)
    Quantity:number
}