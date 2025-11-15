import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandRepository, BrandSchema } from '@Models/Brands';
import { CategoriesModule } from '@modules/category';
import { Category, CategoryRepository, CategorySchema } from '@Models/Categories';
import { BrandFcatory } from './factory';
import { UserSchemaModule } from '@Sahred/Modules';

@Module({
  imports:[UserSchemaModule,MongooseModule.forFeature([{name:Brand.name,schema:BrandSchema},{name:Category.name,schema:CategorySchema}]),CategoriesModule],
  controllers: [BrandController],
  providers: [BrandService,BrandRepository,CategoryRepository,BrandFcatory],
  exports:[BrandRepository]
})
export class BrandModule {}
