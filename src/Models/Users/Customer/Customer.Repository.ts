import { Injectable } from "@nestjs/common";
import AbstractRepository from "../../Abstract.Repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "./Customer.Schema";



@Injectable()
  export class CustomerRepository extends AbstractRepository<Customer>
 {
   constructor(@InjectModel(Customer.name) CustomerModel:Model<Customer>)
   {
    super(CustomerModel)
   }
 }

