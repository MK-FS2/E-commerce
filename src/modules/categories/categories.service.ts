import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryDTO } from './dto';
import { CategoryRepository } from '@Models/Categories';
import { CategoryFactory } from './factory';
import { Types } from 'mongoose';


@Injectable()
export class CategoriesService 
{
constructor(private readonly categoryRepository:CategoryRepository,private readonly categoryFactory:CategoryFactory){}

async AddCategory(CategoryDTO:CategoryDTO,UserID:Types.ObjectId)
{
const CategoryExist = await this.categoryRepository.FindOne({CategoryName:CategoryDTO.CategoryName})
if(CategoryExist)
{
throw new ConflictException("Category alredy exist")
}

if(CategoryDTO.ParentCategoryID)
{
    const ParentExist = await this.categoryRepository.FindOne({_id:CategoryDTO.ParentCategoryID})
    if(!ParentExist)
    {
        throw new BadRequestException("Parent dont exist")
    }
}


const ConstructedCategory = this.categoryFactory.CreatCategory(CategoryDTO,UserID)

const Creationresult = await this.categoryRepository.CreatDocument(ConstructedCategory)
if(!Creationresult)
{
    throw new InternalServerErrorException()
}
return true
}

}
