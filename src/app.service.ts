import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService 
{
  getHello(body:{mm:string},ID:number)
  {
    return {Data:body.mm ,ID:ID}
  }
}
