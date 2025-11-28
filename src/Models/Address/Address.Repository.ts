import AbstractRepository from "@Models/Abstract.Repository"
import { Address } from "./Address.Schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class AddressRepository extends AbstractRepository<Address>
{
    constructor(@InjectModel(Address.name)AddressModel:Model<Address>)
    {
     super(AddressModel)
    }

}