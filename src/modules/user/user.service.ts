import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { Types } from 'mongoose';
import { AddressDTO, UpdateAddressDTO } from './dto';
import { AddressRepository } from '@Models/Address';
import { UserFactory } from './factory';

@Injectable()
export class UserService 
{
constructor(private readonly addressRepository:AddressRepository,private readonly userFactory:UserFactory){}


async AddAddress(UserID:Types.ObjectId,addressDTO:AddressDTO)
{
 const Addresscount = await this.addressRepository.Find({UserID:UserID})

 if(Addresscount && Addresscount.length == 3)
 {
    throw new NotAcceptableException("Maximum ammount of addresses reached")
 }

const constrcutedAddress = this.userFactory.Addaddress(UserID,addressDTO)

const AddingResult = await this.addressRepository.CreatDocument(constrcutedAddress)
if(!AddingResult)
{
    throw new InternalServerErrorException("Adding address Error")
}
return true
}

async UpdateAddress(updateAddressDTO:UpdateAddressDTO,UserID:Types.ObjectId,AddressID:Types.ObjectId)
{
if (!updateAddressDTO.House && !updateAddressDTO.State && !updateAddressDTO.District && !updateAddressDTO.Street && !updateAddressDTO.City)
{
     throw new BadRequestException("At least one field must be provided");
}

const Address = await this.addressRepository.FindOne({_id:AddressID})
if(!Address)
{
    throw new NotFoundException("No address found")
}

const constrcutedAddress = this.userFactory.UpdateAddress(updateAddressDTO)
const UpdatingResult = await this.addressRepository.UpdateOne({_id:AddressID,UserID},{$set:constrcutedAddress})
if(!UpdatingResult)
{
throw new InternalServerErrorException()
}
return true
}

async DeleteAddress(UserID:Types.ObjectId,AddressID:Types.ObjectId)
{
const AddressExist = await this.addressRepository.FindOne({UserID,_id:AddressID})
if(!AddressExist)
{
    throw new NotFoundException("No address found")
}
const Result = await this.addressRepository.DeleteOne({UserID,_id:AddressID})
if(!Result)
{
    throw new InternalServerErrorException()
}
return true
}
}