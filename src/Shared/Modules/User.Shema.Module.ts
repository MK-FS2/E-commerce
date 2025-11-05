import { Admin, AdminRepository, AdminSchema, BaseUserRepository, Customer, CustomerRepository, CustomerSchema, Seller, SellerRepository, SellerSchema, User, UserSchema } from "@Models/Users";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


@Module(
{
imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema},{name:Customer.name,schema:CustomerSchema},{name:Admin.name,schema:AdminSchema}]}])],
providers:[CustomerRepository,SellerRepository,BaseUserRepository,AdminRepository],
exports:[CustomerRepository,SellerRepository,BaseUserRepository,AdminRepository]
})
export class UserSchemaModule{}