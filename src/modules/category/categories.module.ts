import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { UserSchemaModule } from '@Sahred/Modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryRepository, CategorySchema } from '@Models/Categories';
import { CategoryFactory } from './factory';

@Module({
  imports:[UserSchemaModule,MongooseModule.forFeature([{name:Category.name,schema:CategorySchema}])],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoryFactory,CategoryRepository],
  exports:[CategoryRepository]
})
export class CategoriesModule {}
