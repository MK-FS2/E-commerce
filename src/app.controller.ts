import { Body, Controller, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';


@Controller("Auth")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("YO/:ID")
  SendFuck(@Body()body:{mm:string},@Param("ID")ID:number) 
  {
    return this.appService.getHello(body,ID);
  }
}
