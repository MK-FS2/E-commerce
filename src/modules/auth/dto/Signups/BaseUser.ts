import { EmailRegex, PasswordRegex, PhoneRegex, User } from "@Models/Users";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class BaseUser implements Partial<User>
{

  @IsString({ message: 'FirstName name must be a string' })
  @IsNotEmpty({ message: 'FirstNamename is required' }) 
  @Length(2,12)
  FirstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' }) 
  @Length(2, 12)
  LastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @Matches(EmailRegex, { message: "Invalid email format"})
  Email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(PasswordRegex,{message:"Invalid password format: must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long",})
  Password:string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(PhoneRegex, {message:"Invalid phone number format"})
  Phone:string;
}