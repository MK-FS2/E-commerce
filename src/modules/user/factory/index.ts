import { Injectable } from '@nestjs/common';
import { Types } from "mongoose";
import { AddressDTO, UpdateAddressDTO } from "../dto";
import { AddressEntity } from "../entity";

@Injectable()
export class UserFactory 
{
    Addaddress(UserID:Types.ObjectId,addressDTO:AddressDTO)
    {
     const addres = new AddressEntity()

     addres.City = addressDTO.City.trim()
     addres.District = addressDTO.District.trim()
     addres.House = addressDTO.House.trim()
     addres.Street = addressDTO.Street.trim()
     addres.UserID = UserID
     addres.State = addressDTO.State.trim()
     return addres
    }


UpdateAddress(updateAddressDTO: UpdateAddressDTO) {
  const addres = new AddressEntity();

  if (updateAddressDTO.City) 
  {
    addres.City = updateAddressDTO.City.trim();
  }
  if (updateAddressDTO.District) 
 {
    addres.District = updateAddressDTO.District.trim();
  }
  if (updateAddressDTO.House) 
 {
    addres.House = updateAddressDTO.House.trim();
  }
  if (updateAddressDTO.Street) 
  {
    addres.Street = updateAddressDTO.Street.trim();
  }
  if (updateAddressDTO.State) {
    addres.State = updateAddressDTO.State.trim();
  }

  return addres;
}
  
}