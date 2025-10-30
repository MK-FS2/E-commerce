import { AuthController } from './auth.controller';
import { Customer, CustomerRepository, CustomerSchema, SellerSchema, User, UserSchema } from '@Models/Users';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import CustomerFactory from './factory/Customer.factory';
import { Seller } from '@Models/Users';





@Module(
{
  imports:[ MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema},{name:Customer.name,schema:CustomerSchema}]}])],
  controllers:[AuthController],
  providers:[AuthService,CustomerFactory,CustomerRepository]
})
export class AuthModule {}
