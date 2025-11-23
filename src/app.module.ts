import { AuthModule } from '@modules/auth';
import { CategoriesModule } from '@modules/category';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModels } from '@Sahred/Modules';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';



@Module({
  imports: 
  [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.URL as string }) }),
    CommonModels,
    AuthModule,
    BrandModule,
    CategoriesModule,
    ProductModule,
    CartModule
  ]
})
export class AppModule {}
