import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchemaModule } from '@Sahred/Modules';
import { CustomerFactory, SellerFactory } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module(
{
  imports:[UserSchemaModule],
  controllers:[AuthController],
  providers:[AuthService,CustomerFactory,SellerFactory,JwtService]
})
export class AuthModule {}
