import { Injectable } from '@nestjs/common';
import { CreateBrandDTO } from '../dto';
import { CreateBrandEntity } from '../entities/CreatBrand.entity';
import { Types } from 'mongoose';



@Injectable()
export class BrandFcatory 
{

CreateBrand(createBrandDTO:CreateBrandDTO,UserID:Types.ObjectId,CategoryID:Types.ObjectId)
{
const brand = new CreateBrandEntity()
brand.BrandName = createBrandDTO.BrandName
brand.Description = createBrandDTO.Description
brand.CategoryID = CategoryID
brand.CreatedBy = UserID
return brand 
}

}