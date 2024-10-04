import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateClientRequestAddsDto {
  @IsString()
  @IsNotEmpty()
  idOfAdd: string;

  @IsString()
  @IsNotEmpty()
  addItemId: string;

  @IsInt()
  @IsNotEmpty()
  howMany: number;
}

class CreateClientRequestOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsOptional()
  isPromo?: string; // Es opcional ya que no todas las órdenes tienen promociones


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestAddsDto)
  adds: CreateClientRequestAddsDto[];
}

class CreateClientRequestPromoDto {
  @IsString()
  @IsNotEmpty()
  idOfPromo: string;


}

class CreateClientRequestExtraDto {
  @IsString()
  @IsNotEmpty()
  extraId: string;
}

export class CreateClientRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  delivery: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestOrderDto)
  orders: CreateClientRequestOrderDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestExtraDto)
  @IsOptional()
  extras?: CreateClientRequestExtraDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestPromoDto)
  @IsOptional()
  promos?: CreateClientRequestPromoDto[];
}