import { Filecount } from '@Sahred/Enums';

import { BadGatewayException, createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

interface FileDataOptions 
{
  filecount: Filecount;
  optional: boolean;
}

export const FileData = createParamDecorator(
  (data:FileDataOptions,context:ExecutionContext) => 
  {
    try 
    {
    const {filecount,optional} = data
    const req = context.switchToHttp().getRequest()
    let Target: Express.Multer.File | Express.Multer.File[]

    if(filecount == Filecount.File)
    {
    if(!req.file)
    {
        if(optional)
        {
            return undefined
        }
        throw new BadGatewayException("No file uploaded")
    }
    Target = req.file
    return Target
    }
    else if(filecount == Filecount.Files)
    {
    if(!req.files)
    {
    if (optional) return undefined;
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