import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.URL as string }) }),
    AuthModule
  ]
})
export class AppModule {}
