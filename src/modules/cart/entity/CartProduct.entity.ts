import { CartProduct } from "@Models/Cart";
import { Types } from "mongoose";


export class CartProductEntity implements CartProduct 
{
    ProductID: Types.ObjectId;
    VariantID: Types.ObjectId;
    Quantity: number;
}