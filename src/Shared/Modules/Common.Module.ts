import { Token, TokenRepository, TokenSchema } from "@Models/Token";
import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UploadModule } from "@Sahred/Upload/Upload.module";


@Global()
@Module(
{
imports:[MongooseModule.forFeature([{name:Token.name,schema:TokenSchema}]),UploadModule],
providers:[TokenRepository,JwtService],
exports:[TokenRepository,JwtService,UploadModule]
})
export class CommonModels{}