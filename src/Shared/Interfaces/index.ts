import { JwtPayload } from "jsonwebtoken"


export interface TokenPayload extends JwtPayload
{
id:string
FullName:string
Email:string
Role:string
}
