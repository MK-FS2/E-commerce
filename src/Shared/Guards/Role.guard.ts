import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "@Sahred/Decorators";

@Injectable()
export class RoleGuard implements CanActivate 
{
    constructor(private readonly reflector:Reflector){}
    canActivate(context: ExecutionContext)
    {
    try
    {
     const AllowedRoles = this.reflector.getAllAndMerge(ROLES_KEY,[context.getHandler(),context.getClass()]);
      if(AllowedRoles.includes("Public"))
      {
        return true
      }
     const req = context.switchToHttp().getRequest()
     const UserRole:string = req.User.Role
     if(!AllowedRoles.includes(UserRole))
     {
       throw new UnauthorizedException(`You are not authourised`)
     }
     return true
    }
    catch(err)
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new HttpException(err.message,500)
    }
     
    }
}