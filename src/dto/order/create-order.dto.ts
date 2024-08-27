import { IsString, IsUrl, IsNotEmpty } from "class-validator";


class CreateAddItemDTO {
  @IsString()
  @IsNotEmpty()
    name: string;
    limit: number;
    @IsNotEmpty()
    price: number;
  }

  class AddItemDone {
    id: number
  }
  
export  class CreateOrderDTO {
    @IsNotEmpty()
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