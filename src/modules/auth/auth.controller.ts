import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerDTO, SellerDTO } from './dto';




@Controller('auth')
export class AuthController 
{
  constructor(private readonly authService: AuthService) {}

  @Post("signup/customer")
  async SignUPCustomer(@Body() customer:CustomerDTO)
  {
   const CreationResult = await  this.authService.SignupCustomer(customer)
   if(CreationResult == true)
   return { message: "Created successfully", status: 200};
  }

  @Post("signup/seller")
  async SignUPSeller(@Body() seller:SellerDTO)
  {
    const CreationResult = await this.authService.SignupSeller(seller)
    if(CreationResult == true)
    return{ message: "Created successfully", status: 200};
  }
}
