
import { Seller } from "@Models/Users";
import { BaseUserEntity } from "./BaseUserEntity";


export class SellerEntity extends BaseUserEntity implements Seller
{
TaxID!:string
}
