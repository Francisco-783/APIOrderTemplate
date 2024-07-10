import { IsString, IsUrl, IsNotEmpty } from "class-validator";


class AddItemDTO {
  @IsString()
    name: string;
    value: boolean | number;
    price: number;
  
  }
  
export  class CreateOrderDTO {
    id: number;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsUrl()
    image: string;
    description: string;
    visible: boolean;
    add?: AddItemDTO[];
  }