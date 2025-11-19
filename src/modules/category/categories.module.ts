import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { UserSchemaModule } from '@Sahred/Modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryRepository, CategorySchema } from '@Models/Categories';
import { CategoryFactory } from './factory';
import { BrandModule } from '@modules/brand';
import { ProductModule } from '@modules/product';

@Module({
  imports:[UserSchemaModule,MongooseModule.forFeature([{name:Category.name,schema:CategorySchema}]),forwardRef(()=>BrandModule),forwardRef(()=>ProductModule)],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoryFactory,CategoryRepository],
  exports:[CategoryRepository,UserSchemaModule,MongooseModule]
})
export class CategoriesModule {}
