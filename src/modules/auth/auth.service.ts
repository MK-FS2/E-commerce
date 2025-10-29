import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import CustomerDTO from './dto/Signup/Customer.signupdto';
import CustomerFactory from './factory/Customer.factory';
import SendMail from '../../Utils/Mail';
import CustomerRepository from '../../Models/Users/Customer/Customer.Repository';


@Injectable()
export class AuthService 
{
constructor(private readonly CustomerFactory:CustomerFactory,private readonly customerRepository:CustomerRepository){}

  async SignupCustomer(customerDTO:CustomerDTO)
  {
    try 
    {

    const UserExist = await this.customerRepository.Exist({Email:customerDTO.Email})
    if(UserExist === true)
    {
    throw new UnauthorizedException("UserExist")
    }

    const CreatedCustomer = this.CustomerFactory.CreateCustomer(customerDTO)
     
    console.log(CreatedCustomer)

    const result = await SendMail(CreatedCustomer.Email,CreatedCustomer.OTP,CreatedCustomer.OTPExpirationTime);
    if(!result)
    {
      throw new InternalServerErrorException("Server Error SM")
    }
    const Creationresult = await this.customerRepository.CreatDocument(CreatedCustomer)
    if(!Creationresult)
    {
      throw new InternalServerErrorException("Servererror")
    }
    return true
    }
    catch(err)
    {
    throw new HttpException(`${err.message} `,500)
    }
  }

}
