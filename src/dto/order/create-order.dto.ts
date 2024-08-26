import { IsString, IsUrl, IsNotEmpty } from "class-validator";


class CreateAddItemDTO {
  @IsString()
    id?: number
    name: string;
    limit: number;
    price: number;
  }

  class AddItemDone {
    id: number
  }
  
export  class CreateOrderDTO {
    price: number;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsUrl()
    image: string;
    description: string;
    visible: boolean;
    createAddItem?: CreateAddItemDTO[];
    addItemsToConnect: AddItemDone[]
  }