import { Address, Customer } from "@Models/Users"
import { BaseUserEntity } from "./BaseUserEntity"


export class CustomerEntity extends BaseUserEntity implements Customer 
{
Address!:Address 
UserAgent!:boolean
}
