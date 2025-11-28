import { Address } from "@Models/Address";
import { Types } from "mongoose";


export class AddressEntity implements Address
{
City:string;
Street:string;
State:string;
District: string;
House:string;
UserID:Types.ObjectId;
}