import { Body, Controller, Param, Post, UseGuards} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Types } from 'mongoose';
import { CreateBrandDTO } from './dto';
import { Roles, UserData } from '@Sahred/Decorators';
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
   
}
