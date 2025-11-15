
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddProductDTO } from './dto';
import { Types } from 'mongoose';
import { ProductFactory } from './factory';
import { BrandRepository } from '@Models/Brands';
import { CategoryRepository } from '@Models/Categories';
import { ProductRepository } from '@Models/Product';

@Injectable()
export class ProductService 
{
constructor(private readonly brandRepository:BrandRepository,private readonly categoryRepository:CategoryRepository, private readonly productFactor:ProductFactory,private readonly productRepository:ProductRepository){}


async AddProduct(addProductDTO:AddProductDTO,UserID:Types.ObjectId)
{
// basicly the bypass is a option to skip the slug calculation of the brand wicj requrie a model injection via the set options so the doc expect a categoryid so it can activate the category hook
const BrandExist = await this.brandRepository.GetOne(addProductDTO.Brand,true)
if(!BrandExist)
{
    throw  new NotFoundException("No brand found")
}
const CategoryExist = await this.categoryRepository.Exist({_id:addProductDTO.Category})
if(!CategoryExist)
{
     throw  new NotFoundException("No category found")
}

const ConstrcutedProduct = this.productFactor.CreateProduct(addProductDTO,UserID)

const CreationResul = await this.productRepository.CreatDocument(ConstrcutedProduct)

if(!CreationResul)
{
    throw new InternalServerErrorException()
}
return true
}


}
