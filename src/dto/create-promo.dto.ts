import { IsString, IsUrl, IsNotEmpty, IsBoolean, IsArray, IsOptional, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class ConnectExtra {
  @IsNumber()
  id: number;
}

class ConnectOrder {
  @IsNumber()
  id: number;
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectExtra)
  extrasToConnect?: ConnectExtra[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectOrder)
  ordersToConnect: ConnectOrder[];
}