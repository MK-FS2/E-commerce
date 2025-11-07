import AbstractRepository from "@Models/Abstract.Repository";
import { Injectable } from "@nestjs/common";
import { Token } from "./Token.Schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TokenRepository extends AbstractRepository<Token>
{
    constructor(@InjectModel(Token.name) private readonly TokenModel:Model<Token>)
    {
        super(TokenModel)
    }

  async BlackListTokens(accsesstoken:string,refreashtoken:string,UserID:Types.ObjectId)
  {
  const Document:Token = 
  {
    accestoken:accsesstoken,
    refreashtoken:refreashtoken,
    UserID:UserID
  }
    await this.TokenModel.create(Document)
  }

  async CheckAccsesstoken(accsesstoken:string,UserID:Types.ObjectId):Promise<boolean>
  {
   const ISBlacklisted = await this.TokenModel.findOne({accsesstoken:accsesstoken,UserID:UserID})
  if(ISBlacklisted)
  {
    return true
  }
  else 
  {
    return false
  }


  }


  async CheckRefreashtoken(refreashtoken:string,UserID:Types.ObjectId):Promise<boolean>
  {
    const ISBlacklisted = await this.TokenModel.findOne({refreashtoken,UserID})
    if(ISBlacklisted)
    {
     return true
    }
    else 
    {
        return false
    }

  }
}