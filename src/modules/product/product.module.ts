import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductRepository, ProductSchema } from '@Models/Product';
import { ProductFactory } from './factory';
import { BrandModule} from '@modules/brand';
import { CategoriesModule } from '@modules/category';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),BrandModule,CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository,ProductFactory],
})
export class ProductModule {}