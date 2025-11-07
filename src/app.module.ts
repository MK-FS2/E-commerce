import { AuthModule } from '@modules/auth';
import { CategoriesModule } from '@modules/categories';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModels } from '@Sahred/Modules';



@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.URL as string }) }),
    CommonModels,
    AuthModule,
    CategoriesModule
  ]
})
export class AppModule {}
