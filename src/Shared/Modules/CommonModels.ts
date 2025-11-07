import { Token, TokenRepository, TokenSchema } from "@Models/Token";
import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";


@Global()
@Module(
{
imports:[MongooseModule.forFeature([{name:Token.name,schema:TokenSchema}])],
providers:[TokenRepository,JwtService],
exports:[TokenRepository,JwtService]
})
export class CommonModels{}