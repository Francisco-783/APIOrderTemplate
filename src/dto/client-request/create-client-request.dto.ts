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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestAddsDto)
  adds: CreateClientRequestAddsDto[];
}

class CreateClientRequestPromoDto {
  @IsString()
  @IsNotEmpty()
  promoId: string;


  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestOrderDto)
  promoAdds: promoadds[];
}

class CreateClientRequestExtraDto {
  @IsString()
  @IsNotEmpty()
  extraId: string;

}

class promoadds {
  @IsOptional()
  idOrder: string
  @IsOptional()
  adds: string[]
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