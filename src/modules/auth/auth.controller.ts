import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerDTO, SellerDTO, VerificationDTO } from './dto';




@Controller('auth')
export class AuthController 
{
  constructor(private readonly authService: AuthService) {}

  @Post("signup/customer")
  async SignUPCustomer(@Body() customer:CustomerDTO)
  {
   const CreationResult = await  this.authService.SignupCustomer(customer)
   if(CreationResult == true)
   return { message: "Created successfully", status: 201};
  }

  @Post("signup/seller")
  async SignUPSeller(@Body() seller:SellerDTO)
  {
    const CreationResult = await this.authService.SignupSeller(seller)
    if(CreationResult == true)
    return{ message: "Created successfully", status: 201};
  }

  @Post("VerifyEmail")
  async VerifyEmail(@Body() verificationDTO:VerificationDTO)
  {
  const Result = await this.authService.VerifyEmail(verificationDTO)
  if(Result == true)
   return{ message: "Verified successfully", status: 200};
  }
}
