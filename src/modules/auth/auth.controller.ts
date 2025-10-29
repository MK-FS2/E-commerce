import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import CustomerDTO from './dto/Signup/Customer.signupdto';



@Controller('auth')
export class AuthController 
{
  constructor(private readonly authService: AuthService) {}

  @Post("signup/customer")
  async SignUP(@Body() customer:CustomerDTO)
  {
     console.log(customer)

   const CreationResult = await  this.authService.SignupCustomer(customer)
   if(CreationResult == true)
   return { message: "Created successfully", status: 200};
  }

  
}
