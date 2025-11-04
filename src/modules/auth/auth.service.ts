import { BaseUserRepository } from './../../Models/Users/common/BaseUserRepository';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {CustomerRepository, SellerRepository } from '@Models/Users';
import { CustomerDTO, LoginDTO, ResetPasswordDTO, SellerDTO, VerificationDTO } from './dto';
import { nanoid } from 'nanoid';
import SendMail from '@Utils/Mail';
import { CustomerFactory, SellerFactory } from './factory';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from "google-auth-library";




@Injectable()
export class AuthService 
{
constructor(private readonly CustomerFactory:CustomerFactory,
  private readonly customerRepository:CustomerRepository,
  private readonly sellerFactory:SellerFactory,
  private readonly sellerRepository:SellerRepository ,
  private readonly jwtService:JwtService,
  private readonly baseUserRepository:BaseUserRepository
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

 async VerifyEmail(verificationDTO:VerificationDTO) 
 {
  const UserExist = await this.baseUserRepository.FindOne({Email:verificationDTO.Email},{OTP:1,OTPExpirationTime:1})

   if(!UserExist)
   {
    throw new UnauthorizedException("Invalid Email")
   }
   if(UserExist.OTP != verificationDTO.OTP)
   {
    throw new UnauthorizedException("Invalid OTP")
   }

   if(UserExist.OTPExpirationTime as unknown as Date <= new Date()) 
   {
   throw new UnauthorizedException('OTP timed out');
   }

 const RemovingResult = await this.baseUserRepository.UpdateOne({ Email: verificationDTO.Email },{$unset:{OTP:'',OTPExpirationTime:''}});
 if(!RemovingResult)
 {
  throw new InternalServerErrorException()
 }
 return true
 }
  
async ResendOTP(Email:string)
 {

  const EmailExist = await this.baseUserRepository.Exist({Email:Email})
  if(!EmailExist)
  {
  throw new BadRequestException("Invalid email")
  }

  const OTP = nanoid(5)
  const OTPExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
 
  const UpdateDBResult = await this.baseUserRepository.UpdateOne({Email:Email},{$set:{OTP:OTP,OTPExpirationTime:OTPExpirationTime}})

  if(!UpdateDBResult)
  {
    throw new InternalServerErrorException()
  }
  const result = await SendMail(Email,OTP,OTPExpirationTime);
  if(!result)
  {
    await this.customerRepository.UpdateOne({Eamil:Email},{$unset:{OTP:'',OTPExpirationTime:''}})
    throw new InternalServerErrorException("Server Error SM")
  }
  return true
}

async ResetPassword(resetPasswordDTO:ResetPasswordDTO)
{
 const UserExist = await this.baseUserRepository.FindOne({Email:resetPasswordDTO.Email,isVerified:true},{OTP:1,OTPExpirationTime:1})
 if(!UserExist)
 {
  throw new BadRequestException("Invalid email")
 }
 if(UserExist.OTP != resetPasswordDTO.OTP)
 {
    throw new BadRequestException(`Invalid OTP`)
 }
 if(UserExist.OTPExpirationTime as unknown as Date <= new Date())
 {
    throw new BadRequestException("OTP timed out")
 }
 console.log(resetPasswordDTO.Password)
 const Hashedpassword = bcrypt.hashSync(resetPasswordDTO.Password,10)

 const UpdatePasswordresult = await this.baseUserRepository.UpdateOne({ Email: resetPasswordDTO.Email },{$set: { Password: Hashedpassword },$unset: { OTP: "", OTPExpire: "" }});
 if(!UpdatePasswordresult)
 {
  throw new InternalServerErrorException()
 }
 return true
}

async Login(loginDTO: LoginDTO) 
{
  const userExist = await this.baseUserRepository.FindOne({ Email: loginDTO.Email,isVerified:true });
  if (!userExist) {
    throw new BadRequestException('Invalid Email or password');
  }

  const isPasswordValid = bcrypt.compareSync(loginDTO.Password, userExist.Password as unknown as string);
  if (!isPasswordValid) {
    throw new BadRequestException('Invalid Email or password');
  }

  const payload = 
  {
    id: userExist._id,
    fullName: `${userExist.FirstName}-${userExist.LastName}`,
    email: userExist.Email,
    role: userExist.Role,
  };

  const accesstoken = this.jwtService.sign(payload, {secret: process.env.AcessToken,expiresIn:'7d'});
  const refreshtoken = this.jwtService.sign(payload,{secret: process.env.RefreshToken,expiresIn:'30d'});

  return { accesstoken,refreshtoken };
}

async SignUpCustomerGoogleAuth(OAuthToken: string) {
  const key = process.env.ClientKey;
  const client = new OAuth2Client(key);

  const ticket = await client.verifyIdToken({ idToken: OAuthToken, audience: key });
  const payload = ticket.getPayload();

  if (!payload) {
    throw new BadRequestException('Invalid Google token.');
  }

  if (!payload.email || !payload.given_name || !payload.family_name) {
    throw new BadRequestException('Google account did not provide required permissions (email, first name, last name).');
  }

  const userExist = await this.baseUserRepository.Exist({ Email: payload.email });
  if (userExist) {
    throw new ConflictException('Email already exists.');
  }

  const constructedCustomer = this.CustomerFactory.CreateGoogleCustomer(payload);
  const createdCustomer = await this.baseUserRepository.CreatDocument(constructedCustomer);

  if (!createdCustomer) {
    throw new InternalServerErrorException('Failed to create customer.');
  }

  return true; 
}

async loginWithGoogle(OAuthToken: string) 
{
  
  const key = process.env.ClientKey;
  const client = new OAuth2Client(key);

  const ticket = await client.verifyIdToken({
      idToken: OAuthToken,
      audience: process.env.ClientKey,
   });

    const googlePayload = ticket.getPayload();

    if (!googlePayload || !googlePayload.email || !googlePayload.given_name || !googlePayload.family_name) 
    {
      throw new BadRequestException('Google account did not provide required permissions (email, first name, last name).',);
    }

    const userExist = await this.baseUserRepository.FindOne({ Email: googlePayload.email });
    if (!userExist) 
    {
        throw new BadRequestException('Failed to create customer.');
    }
    const payload = 
    {
      id: userExist._id,
      fullName: `${userExist.FirstName}-${userExist.LastName}`,
      email: userExist.Email,
      role: userExist.Role,
    };

    const accesstoken = this.jwtService.sign(payload, {secret: process.env.AcessToken,expiresIn: '7d'});
    const refreshtoken = this.jwtService.sign(payload, {secret: process.env.RefreshToken,expiresIn: '30d'});
    return { accesstoken,refreshtoken};
  }

}
