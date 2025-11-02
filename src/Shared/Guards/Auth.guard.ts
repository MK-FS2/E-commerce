import { CustomerRepository } from '@Models/Users';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';



//  IT shall be ready when i complete the token blacklisting system 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService,private readonly customerRepository:CustomerRepository) {}

  async canActivate(context: ExecutionContext)
   {
    try 
    {
    const req: Request = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer '))
    {
      throw new BadRequestException('Invalid token');
    }
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    const UserExist = await this.customerRepository.FindOne({_id:decoded.id},{Password:0})
    if(!UserExist)
    {
      throw new UnauthorizedException()
    }
    (req as any).User = UserExist
    return true;
    } 
    catch (err) 
    {
      throw new UnauthorizedException(err.message);
    }
  }
}
