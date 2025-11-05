import AbstractRepository from "@Models/Abstract.Repository";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./Admin.Schema";


@Injectable()
  export class AdminRepository extends AbstractRepository<Admin>
 {
   constructor(@InjectModel(Admin.name) AdminModel:Model<Admin>)
   {
    super(AdminModel)
   }
 }
