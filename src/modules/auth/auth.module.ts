import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import CustomerEntity from './entity/Customer.entity';
import CustomerFactory from './factory/Customer.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/Users/common/Schema/User.shema';
import { Seller, SellerSchema } from '../../Models/Users/Seller/Seller.Schema';
import { Customer, CustomerSchema } from '../../Models/Users/Customer/Customer.Schema';
import CustomerRepository from '../../Models/Users/Customer/Customer.Repository';


@Module(
{
  imports:[ MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema},{name:Customer.name,schema:CustomerSchema}]}])],
  controllers:[AuthController],
  providers:[AuthService,CustomerFactory,CustomerRepository]
})
export class AuthModule {}
