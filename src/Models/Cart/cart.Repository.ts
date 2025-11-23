import AbstractRepository from "@Models/Abstract.Repository";
import { Injectable } from "@nestjs/common";
import { Cart } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";



@Injectable()
export class CartRepository extends AbstractRepository<Cart>
{
constructor(@InjectModel(Cart.name) private readonly CartModel:Model<Cart>)
{
super(CartModel)
}

async CreateCart(UserID:Types.ObjectId)
{
 const result = await this.CreatDocument({UserID:UserID})
 if(!result)
 {
    return false
 }
 return true
}

}