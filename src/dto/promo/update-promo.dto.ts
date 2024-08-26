import { IsString, IsUrl, IsBoolean, IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class ConnectExtra {
  @IsNumber()
  id: number;
}

class ConnectOrder {
  @IsNumber()
  id: number;
}

export class UpdatePromoDTO {
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectExtra)
  extrasToConnect?: ConnectExtra[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectOrder)
  ordersToConnect?: ConnectOrder[];
}