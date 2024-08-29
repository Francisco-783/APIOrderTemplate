import { IsInt, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RequestStatus } from '@prisma/client';

class PromoDto {
  @IsInt()
  id: number;
}

class OrderDto {
  @IsInt()
  id: number;
}

class ExtraDto {
  @IsInt()
  id: number;
}

export class CreateClientRequestDto {
  @IsInt()
  clientId: number;

  @IsEnum(RequestStatus)
  @IsOptional()
  status?: RequestStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PromoDto)
  @IsOptional()
  promos?: PromoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @IsOptional()
  orders?: OrderDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraDto)
  @IsOptional()
  extras?: ExtraDto[];
}
