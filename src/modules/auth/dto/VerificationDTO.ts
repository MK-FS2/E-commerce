import { IsNotEmpty, IsString } from "class-validator"



export class VerificationDTO 
{
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    Email:string

    @IsString({ message: 'OTP must be a string' })
    @IsNotEmpty({ message: 'OTP is required' })
    OTP:string
}