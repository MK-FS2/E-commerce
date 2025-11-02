import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerDTO, LoginDTO, ResetPasswordDTO, SellerDTO, VerificationDTO } from './dto';
import { CustomEmailValidation } from '@Sahred/Pipes';





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

  @Post("verifyEmail")
  async VerifyEmail(@Body() verificationDTO:VerificationDTO)
  {
  const Result = await this.authService.VerifyEmail(verificationDTO)
  if(Result == true)
   return{ message: "Verified successfully", status: 200};
  }
 // add rate limiting later
  @Post("/resentopt")
  async ResendOTP(@Body(new CustomEmailValidation()) Email:string)
  {
   const Result = await this.authService.ResendOTP(Email)
  if(Result == true)
  return{ message: "Sent successfully", status: 200};
  }

  //  to add toekn blacklisting later
  @Post("resetpassword")
  async ForgetPassword(@Body() resetPasswordDTO:ResetPasswordDTO)
  {
    const Result = await this.authService.ResetPassword(resetPasswordDTO)
    console.log(resetPasswordDTO)
    if(Result == true)
    return{ message: "password updated successfully", status: 200};
  }

  @Post("login")
  async Login(@Body() loginDTO:LoginDTO)
  {
  const Result =  await this.authService.Login(loginDTO)
  return { message: "Loged successfully",accsesstoken:Result.accesstoken,refreashtoken:Result.refreshtoken,status: 200};
  }

  @Post('GoogleCustomerSignup')
  async GoogleSignup(OAuthToken: string)
  {
  const Result = await this.authService.SignUpCustomerGoogleAuth(OAuthToken)
  if(Result == true)
  return { message: "Created successfully", status: 201};
  }

  @Post("Login_Google")
  async LoginGoogle(OAuthToken: string)
  {
  const Result = await this.authService.loginWithGoogle(OAuthToken)
  return { message: "Loged successfully",accsesstoken:Result.accesstoken,refreashtoken:Result.refreshtoken,status: 200};
  }
}
