
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Models/common/User.shema';
import { Seller, SellerSchema } from './Models/Seller/Seller.Schema';
import DevConfigs from './Common/config/Dev.config';





@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true,load:[DevConfigs]}),
    MongooseModule.forRootAsync({inject:[ConfigService],useFactory:(configService:ConfigService)=>({uri:configService.get('DBURL')})}),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema}]}]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
