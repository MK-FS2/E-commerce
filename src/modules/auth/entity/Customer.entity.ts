import {Address, Customer} from "../../../Models/Users/Customer/Customer.Schema";


class CustomerEntity implements Partial<Customer>
{
FirstName!:string 
LastName!:string 
Email!:string
Password!:string 
OTP!:string
OTPExpirationTime!:Date 
Phone!:string
State!:string;
Address!:Address 
}
export default CustomerEntity