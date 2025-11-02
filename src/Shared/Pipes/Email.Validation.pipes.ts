import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EmailRegex } from '@Models/Users';

export class CustomEmailValidation implements PipeTransform 
{
  transform(value:{Email:string}) 
  {
    if(!value.Email)
    {
    throw new BadRequestException(`Email is requried`);
    }
    if (typeof value.Email !== 'string' || !EmailRegex.test(value.Email)) 
    {
      throw new BadRequestException(`Invalid email format ${value.Email}`);
    }
    return value.Email;
  }
}