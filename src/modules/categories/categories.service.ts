import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryDTO, UpdateCategoryDTO } from './dto';
import { CategoryRepository } from '@Models/Categories';
import { CategoryFactory } from './factory';
import { Types } from 'mongoose';


@Injectable()
export class CategoriesService 
{
constructor(private readonly categoryRepository:CategoryRepository,private readonly categoryFactory:CategoryFactory){}

async AddCategory(CategoryDTO:CategoryDTO,UserID:Types.ObjectId)
{
const CategoryExist = await this.categoryRepository.FindOne({CategoryName: { $regex: `^${CategoryDTO.CategoryName}$`, $options: 'i' }});
let Parentslug:string|undefined = ""
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
    Parentslug = ParentExist.Slug
}


const ConstructedCategory = this.categoryFactory.CreatCategory(CategoryDTO,UserID,Parentslug)

const Creationresult = await this.categoryRepository.CreatDocument(ConstructedCategory)
if(!Creationresult)
{
    throw new InternalServerErrorException()
}
return true
}

async UpdateCategory(updateCategoryDTO: UpdateCategoryDTO, UserID: Types.ObjectId, CategoryID: Types.ObjectId) {
    const { CategoryName, ParentCategoryID } = updateCategoryDTO;
    let parentSlug: string | undefined;

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

        parentSlug = parentCategoryExist.Slug;
    } 
    else if(categoryExist.ParentCategoryID) 
    {
        const OldSlug = await this.categoryRepository.FindOne({_id:categoryExist.ParentCategoryID })
        console.log(OldSlug?.Slug)
        parentSlug = OldSlug?.Slug
    }

    if (CategoryName) 
    {
        const nameExist = await this.categoryRepository.FindOne({CategoryName,_id: { $ne: CategoryID }});

        if (nameExist) 
        {
            throw new ConflictException("Category name already exists");
        }
    }

    const newCategory = this.categoryFactory.UpdateCategory(updateCategoryDTO,UserID, parentSlug);

    const updateResult = await this.categoryRepository.UpdateOne({ _id: CategoryID },{ $set: newCategory });

  if(!updateResult)
  {
    throw new InternalServerErrorException()
  }

    return true;
}




}
