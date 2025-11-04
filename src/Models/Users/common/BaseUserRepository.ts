import AbstractRepository from "@Models/Abstract.Repository";
import { User } from "./BaseUser.Shema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
  export class BaseUserRepository extends AbstractRepository<User>
 {
   constructor(@InjectModel(User.name) CustomerModel:Model<User>)
   {
    super(CustomerModel)
   }
 }
