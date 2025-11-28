import { IsNotEmpty, IsString, Length } from "class-validator";

export class AddressDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2,200)
  House: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  State: string;

  @IsNotEmpty()
  @IsString()
  @Length(2,100)
  District: string;

  @IsNotEmpty()
  @IsString()
  @Length(2,100)
  Street: string;

  @IsNotEmpty()
  @IsString()
  @Length(2,100)
  City: string;
}
