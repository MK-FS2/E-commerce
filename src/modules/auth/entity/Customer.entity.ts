import { Address, Customer } from "@Models/Users"


export class CustomerEntity implements Customer
{
FirstName!:string 
LastName!:string 
Email!:string
Password!:string 
OTP!:string
OTPExpirationTime!:Date 
Phone!:string
Address!:Address 
}
