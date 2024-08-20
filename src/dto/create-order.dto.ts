import { IsString, IsUrl, IsNotEmpty } from "class-validator";


class CreateAddItemDTO {
  @IsString()
    id?: number
    name: string;
    value: number;
    price: number;
  }

  class AddItemDone {
    id: number
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
    createAddItem?: CreateAddItemDTO[];
    addItemDone: AddItemDone[]
  }