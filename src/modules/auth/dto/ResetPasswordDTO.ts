import { EmailRegex, PasswordRegex } from '@Models/Users';
import { IsString, IsNotEmpty, Matches, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatch', async: false })
class PasswordMatch implements ValidatorConstraintInterface 
{
  validate(_: any, args: any) 
  {
    const obj = args.object;
    return obj.Password === obj.RePassword;
  }
  defaultMessage() 
  {
    return 'Passwords do not match';
  }
}

export class ResetPasswordDTO {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @Matches(EmailRegex, { message: 'Invalid Email format'})
  Email: string;

  @IsString({ message: 'OTP must be a string' })
  @IsNotEmpty({ message: 'OTP is required' })
  OTP: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(PasswordRegex,{message:'Invalid Email format'})
  Password: string;

  @IsString({ message: 'RePassword must be a string' })
  @IsNotEmpty({ message: 'RePassword is required' })
  @Validate(PasswordMatch)
  RePassword: string;
}