import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seller } from "./Seller.Schema";
import AbstractRepository from "../Abstract.Repository";


@Injectable()
class SellerRepository extends AbstractRepository<Seller>
{
constructor(@InjectModel(Seller.name) SellerModel:Model<Seller>)
{
super(SellerModel)
}

}

export default  SellerRepository 
