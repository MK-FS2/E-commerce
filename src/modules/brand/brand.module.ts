import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandRepository, BrandSchema } from '@Models/Brands';
import { CategoriesModule } from '@modules/category';
import { BrandFcatory } from './factory';


@Module({
  imports:[MongooseModule.forFeature([{name:Brand.name,schema:BrandSchema}]),CategoriesModule],
  controllers: [BrandController],
  providers: [BrandService,BrandRepository,BrandFcatory],
  exports:[BrandRepository,MongooseModule]
})
export class BrandModule {}
