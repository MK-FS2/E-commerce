import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchemaModule } from '@Sahred/Modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressRepository, AddressSchema } from '@Models/Address';
import { UserFactory } from './factory';

@Module({
  imports:[UserSchemaModule,MongooseModule.forFeature([{name:Address.name,schema:AddressSchema}])],
  controllers: [UserController],
  providers: [UserService,AddressRepository,UserFactory],
})
export class UserModule {}
