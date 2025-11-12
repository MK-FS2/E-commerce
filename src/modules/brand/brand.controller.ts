import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Types } from 'mongoose';
import { CreateBrandDTO, UpdateBrandDTO } from './dto';
import { PublicBypass, Roles, UserData } from '@Sahred/Decorators';
import { ValidMongoID } from '@Sahred/Pipes';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';


@Controller('brand')
@Roles(["Admin"])
@UseGuards(AuthGuard,RoleGuard)
export class BrandController 
{
  constructor(private readonly brandService: BrandService) {}

  @Post("/addbrand/:CategoryID")
  async AddBrand(@Body() createBrandDTO:CreateBrandDTO,@UserData("_id") UserID:Types.ObjectId,@Param("CategoryID",ValidMongoID) CategoryID:Types.ObjectId)
  {
   const Result = await this.brandService.AddBrand(createBrandDTO,UserID,CategoryID)
   if(Result == true)
    return{ message: `Brand Added successfully `, status: 200};
  }

  @Put("updatebrand/:BrandID")
  async UpdateBrand(@Body() updateBrandDTO:UpdateBrandDTO,@Param("BrandID") BrandID:Types.ObjectId,@UserData("_id") UserID:Types.ObjectId)
  {
  const Result = await this.brandService.UpdateBrand(updateBrandDTO,BrandID,UserID)
   if(Result == true)
    return{message: "Brand Updated successfully", status: 200}
  }
   
  @Get("allbrands")
  @PublicBypass()
  async GetAll()
  {
   const Data = await this.brandService.GetAllBrands()
   return {Data:Data,status: 200}
  }

}
