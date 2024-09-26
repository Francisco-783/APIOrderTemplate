import { IsString, IsUrl, IsNotEmpty, MinLength, IsBoolean, IsNumber, Min } from "class-validator";

export class CreateExtraDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsUrl()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @IsBoolean()
    visible: boolean;

    @IsNumber()
    @IsNotEmpty()
    @Min(5)
    price: number;

    @IsString()
    @IsNotEmpty()
    createdBy: string
}
