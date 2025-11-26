import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from "class-transformer";
import { validate } from 'class-validator';

@Injectable()
export class ParseAndValidateJsonPipe<T extends object> implements PipeTransform 
{
  constructor(private readonly DTO: new () => T) {}
  
  async transform(value: any) 
  {
    if (typeof value === 'string') 
    {
      let Rawobject: T;
      try 
      {
        Rawobject = JSON.parse(value);
      } 
      catch (error) 
      {
        throw new BadRequestException(`Invalid JSON format in ProductData ${error.message}`);
      }

      const ObjectInstance = plainToInstance(this.DTO, Rawobject, {enableImplicitConversion:true});
      const errors = await validate(ObjectInstance);
      if (errors.length > 0) 
      {
        const formattedErrors = errors.map(err => ({field: err.property,errors: Object.values(err.constraints || {})}));
        throw new BadRequestException({statusCode: 400,message: formattedErrors,error:'Validation Failed'});
      }
      return ObjectInstance;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}