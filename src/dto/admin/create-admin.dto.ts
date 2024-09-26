import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {

    @IsString() 
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString() 
    @IsNotEmpty()
    @MinLength(3)
    password: string
}