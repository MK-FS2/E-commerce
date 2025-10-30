import { IsString, IsNotEmpty, Length, Matches } from "class-validator";
import { Customer } from "../../../../Models/Users/Customer/Customer.Schema";
import { EmailRejex, PasswordRegex, PhoneRegex } from "../../../../Models/Users/common/validation";


export class CustomerDTO implements Partial<Customer> {
  @IsString()
  @IsNotEmpty()
  @Length(2, 12)
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 12)
  LastName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(EmailRejex, { message: "Invalid email format"})
  Email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PasswordRegex,{message:"Invalid password format: must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long",})
  Password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(PhoneRegex, {message:"Invalid phone number format"})
  Phone: string;

  @IsNotEmpty()
  @IsString()
  State: string;

  @IsNotEmpty()
  @IsString()
  City: string;

  @IsNotEmpty()
  @IsString()
  District: string;

  @IsNotEmpty()
  @IsString()
  Street: string;

  @IsNotEmpty()
  @IsString()
  House: string;
}

export default CustomerDTO;
