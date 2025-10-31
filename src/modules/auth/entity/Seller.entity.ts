import {SpecialisationTypes } from "@Models/Shared";
import { Seller } from "@Models/Users";
import { BaseUserEntity } from "./BaseUserEntity";


export class SellerEntity extends BaseUserEntity implements Seller
{
productSpecialisation!:SpecialisationTypes[]
TaxID!:string
PrandName!:string
}
