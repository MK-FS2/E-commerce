import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import CustomerFactory from './factory/Customer.factory';
import { UserSchemaModule } from '@Sahred/Modules';
import { SellerFactory } from './factory';

@Module(
{
  imports:[UserSchemaModule],
  controllers:[AuthController],
  providers:[AuthService,CustomerFactory,SellerFactory]
})
export class AuthModule {}
