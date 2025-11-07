import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dto';
import { AuthGuard } from '@Sahred/Guards/Auth.guard';
import { UserData } from '@Sahred/Decorators';
import mongoose from 'mongoose';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController 
{
  constructor(private readonly categoriesService:CategoriesService) {}

  @Post("/AddCategory")
  async AddingCategory(@Body() CategoryDTO:CategoryDTO , @UserData("_id") userID:string)
  {
    const UserID = new mongoose.Types.ObjectId(userID)
    const Result = await this.categoriesService.AddCategory(CategoryDTO,UserID)
    if(Result ==  true)
    return{ message: "Sent successfully", status: 200};
  }
  
}
