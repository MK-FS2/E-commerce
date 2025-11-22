import { Filecount } from '@Sahred/Enums';

import { BadGatewayException, createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';


export const FileData = createParamDecorator(
  (filecount:Filecount,context:ExecutionContext) => 
  {
    try 
    {
    const req = context.switchToHttp().getRequest()
    let Target: Express.Multer.File | Express.Multer.File[]

    if(filecount == Filecount.File)
    {
    if(!req.file)
    {
        throw new BadGatewayException("No file uploaded")
    }
    Target = req.file
    return Target
    }
    else if(filecount == Filecount.Files)
    {
    if(!req.files)
    {
     throw new BadGatewayException("No file uploaded")
    }
    Target = req.files
    return Target
    }
    else 
    {
        throw new InternalServerErrorException("Filedata")
    }
    }
    catch(err)
    {
    throw new InternalServerErrorException(err)
    }
  },
);