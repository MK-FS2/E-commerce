import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { CartProductEntity } from "../entity";

@Injectable()
export class CartFactory 
{

 CreateProduct(ProductID:Types.ObjectId,VariantID:Types.ObjectId,Quantity:number)
 {
 const cartproduct = new CartProductEntity()

 cartproduct.ProductID = ProductID
 cartproduct.VariantID = VariantID
 cartproduct.Quantity  = Quantity
 return cartproduct
 }


}