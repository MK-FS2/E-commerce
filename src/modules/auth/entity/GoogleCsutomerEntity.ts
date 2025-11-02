import { BaseUserEntity } from "./BaseUserEntity";


export class GoogleCustomeEntity implements Partial<BaseUserEntity>
{
    Email:string 
    FirstName:string 
    LastName:string 
    isVerified:boolean
    UserAgent:boolean
}