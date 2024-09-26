import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateAddItemDto {

    @IsString() 
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    limit: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;

    @IsNotEmpty()
    @IsString()
    orderId?: string; 
}