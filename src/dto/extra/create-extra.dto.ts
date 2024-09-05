import { IsString, IsUrl, IsNotEmpty } from "class-validator";

export class CreateExtraDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    image: string;

    visible: boolean;
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    createdBy: string
}
