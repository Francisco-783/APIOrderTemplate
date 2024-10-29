import { IsString, IsUrl, IsNotEmpty, MinLength, IsBoolean, IsNumber, Min, isString } from "class-validator";

export class CreateStoreSettings {

    @IsNotEmpty()
    isOpen: boolean

    @IsString()
    @IsNotEmpty()
    address: string
}
