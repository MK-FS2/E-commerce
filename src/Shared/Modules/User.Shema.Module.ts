import { Customer, CustomerRepository, CustomerSchema, Seller, SellerRepository, SellerSchema, User, UserSchema } from "@Models/Users";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


@Module(
{
imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema},{name:Customer.name,schema:CustomerSchema}]}])],
providers:[CustomerRepository,SellerRepository],
exports:[CustomerRepository,SellerRepository]
})
export class UserSchemaModule{}