import { BrandFcatory } from './factory/index';
import { BrandRepository } from '@Models/Brands';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateBrandDTO } from './dto';
import { CategoryRepository } from '@Models/Categories';


@Injectable()
export class BrandService 
{
 constructor(private readonly brandRepository:BrandRepository,private readonly categoryRepository:CategoryRepository,private readonly brandFcatory:BrandFcatory){}
  

 async AddBrand(createBrandDTO:CreateBrandDTO,UserID:Types.ObjectId,CategoryID:Types.ObjectId):Promise<boolean>
 {
  const BrandExist = await this.brandRepository.Exist({ BrandName: { $regex: `^${createBrandDTO.BrandName}$`, $options: 'i' } });
  if(BrandExist)
  {
    throw new ConflictException("Brand alredy exist")
  }

  const CategoryExist = await this.categoryRepository.Exist({_id:CategoryID})
  if(!CategoryExist)
  {
    throw new NotFoundException("No category found")
  }
  const ConstrcutedBrand = this.brandFcatory.CreateBrand(createBrandDTO,UserID,CategoryID)

  const CreaationResult = await this.brandRepository.CreatDocument(ConstrcutedBrand)
  if(!CreaationResult)
  {
    throw new InternalServerErrorException()
  }

  return true
 }



}
