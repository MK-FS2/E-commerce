import {  BadRequestException, PipeTransform } from "@nestjs/common";
import mongoose, { Types } from "mongoose";



export class ValidMongoID implements PipeTransform
{
    transform(value:string) 
    {
        if(!value)
        {
            throw new BadRequestException("value is is requried")
        }
        if(!Types.ObjectId.isValid(value))
        {
         throw new BadRequestException("Invalied ID format")
        }
        else 
        {
            const TransformedID  = new mongoose.Types.ObjectId(value)
            return TransformedID
        }
        
    }
}