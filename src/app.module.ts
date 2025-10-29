
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Models/Users/common/Schema/User.shema';
import { Seller, SellerSchema } from './Models/Users/Seller/Seller.Schema';
import DevConfigs from './Common/config/Dev.config';
import { Customer, CustomerSchema } from './Models/Users/Customer/Customer.Schema';






@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true,load:[DevConfigs]}),
    MongooseModule.forRootAsync({inject:[ConfigService],useFactory:(configService:ConfigService)=>({uri:configService.get('DBURL')})}),
    MongooseModule.forFeature([{name:User.name,schema:UserSchema,discriminators:[{name:Seller.name,schema:SellerSchema},{name:Customer.name,schema:CustomerSchema}]}]),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
