import { Injectable, Scope } from "@nestjs/common";
import CustomerEntity from "../entity/Customer.entity";
import CustomerDTO from "../dto/Signup/Customer.signupdto";
import * as bcrypt from 'bcrypt';
import {nanoid} from "nanoid"

@Injectable({scope:Scope.REQUEST})
class CustomerFactory 
{

   CreateCustomer(CustomerData: CustomerDTO): CustomerEntity {
    const customer = new CustomerEntity();
    customer.FirstName = CustomerData.FirstName;
    customer.LastName  = CustomerData.LastName;
    customer.Email = CustomerData.Email;
    customer.Phone = CustomerData.Phone;
    customer.Password = bcrypt.hashSync(CustomerData.Password, 10);
    customer.Address = 
    {
        City: CustomerData.City,
        District: CustomerData.District,
        State: CustomerData.State,
        House: CustomerData.House,
        Street: CustomerData.Street
    };
    customer.OTP = nanoid();
    customer.OTPExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
    return customer;
}
   
}

export default CustomerFactory