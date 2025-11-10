import { TokenRepository } from '@Models/Token';
import { BaseUserRepository } from './../../Models/Users/common/BaseUserRepository';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from '@Sahred/Interfaces';
import mongoose from 'mongoose';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@Sahred/Decorators';

@Injectable()
export class AuthGuard implements CanActivate 
{
  constructor( private readonly jwtService: JwtService, private readonly baseUserRepository: BaseUserRepository, private readonly tokenRepository: TokenRepository,private readonly reflector:Reflector) {}

  async canActivate(context: ExecutionContext) 
  {
    try 
    {
     const AccessState = this.reflector.get(ROLES_KEY,context.getHandler())
      if(AccessState == "Public")
      {
        return true
      }
      const req: Request = context.switchToHttp().getRequest();
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith('Bearer ')) 
      {
        throw new BadRequestException('Invalid token');
      }

      const token = authorization.split(' ')[1];
      const decoded: TokenPayload = this.jwtService.verify(token, {secret: process.env.AcessToken,});

      const userId = new mongoose.Types.ObjectId(decoded.id);

      const isBlacklisted = await this.tokenRepository.CheckAccsesstoken(token, userId);
      if (isBlacklisted) 
      {
        throw new UnauthorizedException('Deprecated token. Login again.');
      }

      // Optional: verify refresh token if provided
      if (req.headers['refreashtoken']) 
      {
        const refreashtoken = req.headers['refreashtoken'] as string;
        const isRefBlacklisted = await this.tokenRepository.CheckRefreashtoken(refreashtoken, userId);
        if (isRefBlacklisted) {
          throw new UnauthorizedException('Deprecated refresh token. Login again.');
        }

        this.jwtService.verify(refreashtoken, {
          secret: process.env.RefreshToken,
        });
      }

      const user = await this.baseUserRepository.FindOne({ _id: decoded.id },
        { Password: 0, UserAgent: 0, OTP: 0, OTPExpirationTime: 0, isVerified: 0 }
      );

      if (!user) 
      {
        throw new NotFoundException('No user found');
      }

      (req as any).User = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
