import { BrandFcatory } from './factory/index';
import { BrandRepository } from '@Models/Brands';
import { ConflictException, Injectable, NotFoundException,BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateBrandDTO, UpdateBrandDTO } from './dto';
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


 async UpdateBrand(updateBrandDTO:UpdateBrandDTO,BrandID:Types.ObjectId,UserID:Types.ObjectId)
 {
  const {BrandName,Description,CategoryID} = updateBrandDTO
  if(!BrandName && !Description && !CategoryID)
  {
    throw new BadRequestException("You should provide at least one parameter")
  }
  const BrandExist = await this.brandRepository.FindOne({_id:BrandID},{CategoryID:1})
  if(!BrandExist)
  {
    throw new NotFoundException("No brand found")
  }
 if(CategoryID)
 {
  const CategoryExist = await this.categoryRepository.Exist({_id:CategoryID})
  if(!CategoryExist)
  {
    throw new NotFoundException("No category found")
  }
  if(CategoryID.equals(BrandExist.CategoryID))
  {
    throw new ConflictException("You cant update with save data")
  }
 }
 const ConstrcutedBrand = this.brandFcatory.UpdateBrand(updateBrandDTO,UserID)
 console.log(ConstrcutedBrand)
 const Updateresults = await this.brandRepository.UpdateOne({_id:BrandID},{$set:ConstrcutedBrand}) 
 if(!Updateresults)
 {
 throw new InternalServerErrorException()
 }
 return true
 }

 async GetAllBrands(Page: number,Limit: number)
{
    const Skip = Math.ceil((Page - 1) * Limit);
    const Brands = await this.brandRepository.GetAll({},{},{skip: Skip,limit:Limit,populate: [{ path: "CreatedBy", select: "_id FirstName LastName Email" }, { path: "UpdatedBy", select: "_id FirstName LastName Email" }, { path: "CategoryID", select: "_id CategoryName Slug" }]});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Brands;
}

 async GetOneBrand(BrandID:Types.ObjectId)
 {
 const BrandExist = await this.brandRepository.GetOne({_id:BrandID},{},{populate: [{ path: "CreatedBy", select: "_id FirstName LastName Email" }, { path: "UpdatedBy", select: "_id FirstName LastName Email" }, { path: "CategoryID", select: "_id CategoryName Slug" }]})
 if(!BrandExist)
 {
  throw new NotFoundException("No brand found")
 }
  return BrandExist
 }


}
