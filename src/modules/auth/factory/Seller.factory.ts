import { Injectable} from "@nestjs/common";
import { SellerEntity } from "../entity";
import { SellerDTO } from "../dto";
import { nanoid } from "nanoid";
import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';



@Injectable()
export class SellerFactory
{

CreateSeller(SellerData:SellerDTO):SellerEntity
{
const Seller = new SellerEntity()

Seller.FirstName = SellerData.FirstName
Seller.LastName = SellerData.LastName
Seller.Email = SellerData.Email
Seller.PrandName = SellerData.PrandName
Seller.Phone = CryptoJS.AES.encrypt( SellerData.Phone,process.env.Encryptionkey as string).toString()
Seller.TaxID = CryptoJS.AES.encrypt(SellerData.TaxID,process.env.Encryptionkey as string).toString() 
Seller.OTP = nanoid(5)
Seller.Password = bcrypt.hashSync(SellerData.Password,10);
Seller.OTPExpirationTime = new Date(Date.now() + 5 * 60 * 1000)
return Seller
}

}