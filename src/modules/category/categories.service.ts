import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryDTO, UpdateCategoryDTO } from './dto';
import { Category, CategoryRepository } from '@Models/Categories';
import { CategoryFactory } from './factory';
import { HydratedDocument, Types } from 'mongoose';


@Injectable()
export class CategoriesService 
{
constructor(private readonly categoryRepository:CategoryRepository,private readonly categoryFactory:CategoryFactory){}

async AddCategory(CategoryDTO:CategoryDTO,UserID:Types.ObjectId)
{
const CategoryExist = await this.categoryRepository.FindOne({CategoryName: { $regex: `^${CategoryDTO.CategoryName}$`, $options: 'i' }});
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
if(!Creationresult)throw new InternalServerErrorException()
return true
}

async UpdateCategory(updateCategoryDTO: UpdateCategoryDTO, UserID: Types.ObjectId, CategoryID: Types.ObjectId) {
    const { CategoryName, ParentCategoryID } = updateCategoryDTO;;
    if (!CategoryName && !ParentCategoryID) 
    {
        throw new BadRequestException("You must provide at least CategoryName or ParentCategoryID");
    }

    const categoryExist = await this.categoryRepository.FindOne({ _id: CategoryID },{ ParentCategoryID: 1, Slug: 1 });

    if (!categoryExist) 
    {
        throw new NotFoundException("No category found");
    }

    if (ParentCategoryID) 
    {
        if (ParentCategoryID == CategoryID) 
        {
            throw new ConflictException("A category can't be the parent of itself");
        }

        const parentCategoryExist = await this.categoryRepository.FindOne({ _id: ParentCategoryID });
        if (!parentCategoryExist) 
        {
            throw new NotFoundException("Parent category not found");
        }

        const SubCategories = await this.categoryRepository.Find({ParentCategoryID:CategoryID})
        if(SubCategories)
        {
         for(const category of SubCategories)
         {
            if (category._id.equals(ParentCategoryID))
            {
                throw new BadRequestException("A category cant be a subcategoty of its own subcategory")
            }
         }
        }
        
    } 
   

    if (CategoryName) 
    {
        const nameExist = await this.categoryRepository.FindOne({CategoryName,_id: { $ne: CategoryID }});

        if (nameExist) 
        {
            throw new ConflictException("Category name already exists");
        }
    }
    const newCategory = this.categoryFactory.UpdateCategory(updateCategoryDTO,UserID);
    const updateResult = await this.categoryRepository.UpdateOne({ _id: CategoryID },{ $set: newCategory });

  if(!updateResult)
  {
    throw new InternalServerErrorException()
  }

    return true;
}

async GetAllCategories():Promise<[]|HydratedDocument<Category>[]>
{
    const Categories = await this.categoryRepository.Find({ParentCategoryID:undefined},{},{populate:{path:"SubCategories",populate:{path:"SubCategories"}}})

    if(!Categories)
    {
        return []
    }
    else 
    {
        return Categories 
    }
}

async GetOneCategory(CategoryID: Types.ObjectId)
{
    const category = await this.categoryRepository.FindOne({_id:CategoryID},{},{populate:{path:"SubCategories",populate:{path:"SubCategories"}}})
    return category
}

}
