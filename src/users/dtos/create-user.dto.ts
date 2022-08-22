import { IsString } from "class-validator";
import { ObjectID } from "typeorm";

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsString() 
    password: string;

    @IsString()
    role: string;

    @IsString() 
    email: string;

    @IsString()
    userInfo: string;

    @IsString()
    phoneNumber: string;

}