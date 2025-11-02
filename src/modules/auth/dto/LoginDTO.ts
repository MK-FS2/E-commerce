import { IsNotEmpty, IsString } from "class-validator"



export class LoginDTO 
{
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    Email:string

    @IsString({ message: 'Password must be a string'})
    @IsNotEmpty({ message: 'Password is required' })
    Password:string
}