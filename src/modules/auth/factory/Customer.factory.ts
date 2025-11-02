import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {nanoid} from "nanoid"
import { CustomerDTO } from "../dto";
import { CustomerEntity, GoogleCustomeEntity } from "../entity";
import { TokenPayload } from "google-auth-library";


@Injectable()
export class CustomerFactory 
{

   CreateCustomer(CustomerData: CustomerDTO): CustomerEntity 
   {
    const customer = new CustomerEntity();
    customer.FirstName = CustomerData.FirstName;
    customer.LastName  = CustomerData.LastName;
    customer.Email = CustomerData.Email;
    customer.Phone = CustomerData.Phone;
    customer.Password = bcrypt.hashSync(CustomerData.Password,10);
    customer.Address = 
    {
        City: CustomerData.City,
        District: CustomerData.District,
        State: CustomerData.State,
        House: CustomerData.House,
        Street: CustomerData.Street
    };
    customer.OTP = nanoid(5);
    customer.OTPExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
    customer.UserAgent = true
    return customer;
}
   

 CreateGoogleCustomer(Payload:TokenPayload):GoogleCustomeEntity
 {
 const customer  = new GoogleCustomeEntity()
 
 customer.Email = Payload.email as unknown as string
 customer.FirstName = Payload.given_name as unknown as string
 customer.LastName = Payload.family_name as unknown as string
 customer.isVerified = true
 customer.UserAgent = false
 return customer
 }

}
