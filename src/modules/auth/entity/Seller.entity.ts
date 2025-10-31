import {SpecialisationTypes } from "@Models/Shared";
import { Seller } from "@Models/Users";


export class SellerEntity implements Seller
{
FirstName!:string 
LastName!:string 
Email!:string
Password!:string 
OTP!:string
OTPExpirationTime!:Date 
Phone!:string
productSpecialisation!:SpecialisationTypes[]
TaxID!:string
PrandName!:string
}
