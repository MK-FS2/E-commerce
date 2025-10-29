import { Injectable } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';

@Injectable()
export class AppService 
{
  constructor(private readonly authservises:AuthService){}
  getHello(body:{mm:string},ID:number)
  {
    return {Data:this.authservises.SENDFUCK(body.mm) ,ID:ID}
  }
}
