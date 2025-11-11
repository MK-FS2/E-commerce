import { UpdateCategoryDTO } from './dto/Updatecategory.dto';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dto';
import { PublicBypass, Roles, UserData } from '@Sahred/Decorators';
import mongoose, { Types } from 'mongoose';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { ValidMongoID } from '@Sahred/Pipes';

@Controller('categories')
@Roles(["Admin"])
@UseGuards(AuthGuard,RoleGuard)
export class CategoriesController 
{
  constructor(private readonly categoriesService:CategoriesService) {}

  @Post("/AddCategory")
  async AddingCategory(@Body() CategoryDTO:CategoryDTO , @UserData("_id") userID:string)
  {
    const UserID = new mongoose.Types.ObjectId(userID)
    const Result = await this.categoriesService.AddCategory(CategoryDTO,UserID)
    if(Result ==  true)
    return{ message: `Category Added successfully`, status: 200};
  }

   
    @Put("/updatecategory/:CategoryID")
    async UpdateCategory( @Body() updateCategoryDTO:UpdateCategoryDTO ,@UserData("_id") UserID:string ,@Param("CategoryID",ValidMongoID) CategoryID:Types.ObjectId)
    {

      const userid = new mongoose.Types.ObjectId(UserID)
      const Result = await this.categoriesService.UpdateCategory(updateCategoryDTO,userid,CategoryID)
      if(Result == true)
      return{message: "Category Updated successfully", status: 200}
    }

    @Get("/allcategories")
    @PublicBypass()
   async GetAllCategories()
   {
    const Data = await this.categoriesService.GetAllCategories()
    return{Data:Data, status: 200}
   }

   @Get("/onecategory/:CategoryID")
   @PublicBypass()
  //  i made ValidMongoID to make validation and transformtion
   async GetOnecategory(@Param("CategoryID",ValidMongoID) CategoryID:Types.ObjectId)
   {
  const Result = await this.categoriesService.GetOneCategory(CategoryID)
   return{Data:Result, status: 200}
  }
}
