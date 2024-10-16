import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateClientRequestAddsDto {
  @IsString()
  @IsNotEmpty()
  addId: string;

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
  @Type(() => ordersPromo)
  orders: ordersPromo[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateClientRequestExtraDto)
  extras: CreateClientRequestExtraDto[];
}

class ordersPromo { 
  @IsOptional()
  idOrder: string
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => promoAdds)
  adds: promoAdds[]
}

class promoAdds  {
  @IsString()
  @IsNotEmpty()
  addId:string

  @IsInt()
  @IsNotEmpty()
  howMany: number
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