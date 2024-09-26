import { IsString, IsUrl, IsNotEmpty, IsBoolean, IsArray, IsOptional, ValidateNested, IsNumber, isString } from "class-validator";
import { Type } from "class-transformer";

class ConnectExtra {
  @IsString()
  id: string;
}

class ConnectOrder {
  @IsString()
  id: string;
}

export class CreatePromoDTO {
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  image: string;

  @IsBoolean()
  visible: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectExtra)
  extrasToConnect?: ConnectExtra[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectOrder)
  ordersToConnect: ConnectOrder[];

  @IsString()
  @IsNotEmpty()
  createdBy: string
}