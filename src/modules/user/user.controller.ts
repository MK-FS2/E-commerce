import { Types } from 'mongoose';
import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles, UserData } from '@Sahred/Decorators';
import { AddressDTO, UpdateAddressDTO } from './dto';
import { AuthGuard, RoleGuard } from '@Sahred/Guards';
import { ValidMongoID } from '@Sahred/Pipes';

@Roles(["Customer"])
@UseGuards(AuthGuard,RoleGuard)
@Controller('user')
export class UserController 
{
  constructor(private readonly userService: UserService) {}

@Post("addnewaddress")
async AddAddress(@UserData("_id")UserID:Types.ObjectId,@Body()addressDTO:AddressDTO)
  {
   const Result = await this.userService.AddAddress(UserID,addressDTO)
   if(Result == true)
   return{ message: `Address Added successfully`, status: 200};
}

@Put("editaddress/:AddressID")
async EditAddress(@Body() updateAddressDTO:UpdateAddressDTO,@UserData("_id")UserID:Types.ObjectId,@Param("AddressID",ValidMongoID)AddressID:Types.ObjectId)
  {
  const Result = await this.userService.UpdateAddress(updateAddressDTO,UserID,AddressID)
  if(Result == true)
  return{ message: `Address Updated successfully`, status: 200};
}

@Delete("deleteaddress/:AddressID")
async DeleteAddress(@UserData("_id")UserID:Types.ObjectId,@Param("AddressID",ValidMongoID)AddressID:Types.ObjectId)
{
const Result = await this.userService.DeleteAddress(UserID,AddressID)
if(Result == true)
return{ message: `Address deleted successfully`, status: 200};
}
}
