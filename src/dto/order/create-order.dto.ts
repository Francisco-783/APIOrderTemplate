import { Type } from "class-transformer";
import { IsString, IsUrl, IsNotEmpty, IsNumber, Min, MinLength, ValidateNested, IsBoolean, IsOptional } from "class-validator";


class CreateAddItemDTO {
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
}

  class AddItemDone {
    @IsString()
    id: string
  }
  
export  class CreateOrderDTO {
    @IsNotEmpty()
    @Min(5)
    price: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsUrl()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    visible: boolean;

    @ValidateNested({ each: true })
    @Type(() => CreateAddItemDTO)
    @IsOptional()
    createAddItem?: CreateAddItemDTO[];
  
    @ValidateNested({ each: true })
    @Type(() => AddItemDone)
    @IsOptional()
    addItemsToConnect: AddItemDone[];
  

    
    @IsString()
    @IsNotEmpty()
    createdBy: string
  
  }