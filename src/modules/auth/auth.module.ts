import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchemaModule } from '@Sahred/Modules';
import { CustomerFactory, SellerFactory } from './factory';
import { CartModule } from '@modules/cart';

@Module(
{
  imports:[UserSchemaModule,CartModule],
  controllers:[AuthController],
  providers:[AuthService,CustomerFactory,SellerFactory]
})
export class AuthModule {}
