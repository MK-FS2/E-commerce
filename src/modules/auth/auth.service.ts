
import { SellerFactory } from './factory/Seller.factory';
import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import CustomerFactory from './factory/Customer.factory';
import SendMail from '../../Utils/Mail';
import { CustomerRepository, SellerRepository } from '@Models/Users';
import { CustomerDTO, SellerDTO } from './dto';



@Injectable()
export class AuthService 
{
constructor(private readonly CustomerFactory:CustomerFactory,
  private readonly customerRepository:CustomerRepository,
  private readonly sellerFactory:SellerFactory,
  private readonly sellerRepository:SellerRepository 
  ){}

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
      throw new InternalServerErrorException()
    }
    return true
    }
    catch(err)
    {
    throw new HttpException(`${err.message} `,500)
    }
  }

  async SignupSeller(sellerDTO:SellerDTO)
  {
    try 
    {
    const UserExist = await this.sellerRepository.Exist({Email:sellerDTO.Email})
    if(UserExist)
    {
      throw new UnauthorizedException("UserExist")
    }
    const ConstructedSeller = this.sellerFactory.CreateSeller(sellerDTO)

    const result = await SendMail(ConstructedSeller.Email,ConstructedSeller.OTP,ConstructedSeller.OTPExpirationTime);
    if(!result)
    {
      throw new InternalServerErrorException("Server Error SM")
    }


    const CretedUser = await this.sellerRepository.CreatDocument(ConstructedSeller)
    if(!CretedUser)
    {
      throw new InternalServerErrorException()
    }
    
    return true
    }
    catch(err)
    {
      throw new HttpException(`${err.message} `,500)
    }
  }
  

}
