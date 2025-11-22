import { Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException } from '@nestjs/common';
import { Filecount } from '@Sahred/Enums';
import FileUploadCloud from '@Sahred/Helpers/FileUploadCloud';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  constructor(private fileTypes: string[],private size: number,private UploadType: Filecount,private FieldName: string,) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> 
  {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const multer = FileUploadCloud(this.fileTypes, this.size);

    const handler = this.UploadType === Filecount.File? multer.single(this.FieldName): multer.array(this.FieldName, 6);

    return new Observable<void>(observer => 
    {
      handler(req, res, (err: any) => 
        {
        if (err) 
        {
          observer.error(new InternalServerErrorException(err.message || 'File upload failed'));
          return;
        }

        if (this.UploadType === Filecount.File && !req.file) 
        {
          observer.error(new InternalServerErrorException('No file uploaded'));
          return;
        }

        if (this.UploadType === Filecount.Files && (!req.files || (req.files as any[]).length === 0)) 
        {
          observer.error(new InternalServerErrorException('No files uploaded'));
          return;
        }
        observer.next();
        observer.complete();
      });
    }).pipe(mergeMap(() => from(next.handle())));
  }
}
