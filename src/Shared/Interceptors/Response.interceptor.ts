import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";



@Injectable()
export class ResponceInterceptor implements NestInterceptor
{
intercept(data:any,next:CallHandler)
{
    
const now = Date.now()
console.log(`${now} before`)

return next.handle().pipe(tap(()=>{console.log(`${Date.now()-now} after`)}))

}
}