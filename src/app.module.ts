import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './src/modules/category/category.module';
import { CategoriesModule } from './modules/categories/categories.module';



@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.URL as string }) }),
    AuthModule,
    CategoryModule,
    CategoriesModule
  ]
})
export class AppModule {}
