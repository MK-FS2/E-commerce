import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductRepository, ProductSchema } from '@Models/Product';
import { ProductFactory } from './factory';
import { Brand, BrandRepository, BrandSchema } from '@Models/Brands';
import { Category, CategoryRepository, CategorySchema } from '@Models/Categories';
import { CategoriesModule } from '@modules/category';
import { BrandModule } from '@modules/brand';
import { UserSchemaModule } from '@Sahred/Modules';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema},{name:Category.name,schema:CategorySchema},{name:Brand.name,schema:BrandSchema}]),CategoriesModule,BrandModule,UserSchemaModule],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository,ProductFactory,BrandRepository,CategoryRepository],
})
export class ProductModule {}
