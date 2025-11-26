import AbstractRepository from "@Models/Abstract.Repository";
import { Injectable } from "@nestjs/common";
import { Cart } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Product } from "@Models/Product";



@Injectable()
export class CartRepository extends AbstractRepository<Cart>
{
constructor(@InjectModel(Cart.name) private readonly CartModel:Model<Cart>,@InjectModel(Product.name) private readonly ProductModle:Model<Product>)
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


async GetCart(UserID: Types.ObjectId) {
  const cart = await this.FindOne({ UserID });
  let TotalPrice:number = 0;
  let TotalQuantity:number = 0 
  if (cart && cart.CartProducts && cart.CartProducts.length > 0) 
  {
   TotalQuantity = cart.CartProducts.reduce((total, product) => total + product.Quantity, 0);
    for (const product of cart.CartProducts) 
      {
      const target = await this.ProductModle.findOne({_id:product.ProductID},{FinaPrice:1,Price:1});
      if (target?.FinaPrice) 
      {
        TotalPrice += target.FinaPrice * product.Quantity; 
      } 
    }

    const cartObj:any = cart.toObject();
    cartObj.TotalQuantity = TotalQuantity;
    cartObj.TotalPrice = TotalPrice;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cartObj;
  } 
  else 
  {
   const cartObj:any = cart!.toObject();
    cartObj.TotalQuantity = 0
    cartObj.TotalPrice = 0
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cartObj;
  }
}

}