import { IsInt, IsOptional, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RequestStatus } from '@prisma/client';

class PromoDto {
  @IsInt()
  id: string;
}

class OrderDto {
  @IsInt()
  id: string;
}

class ExtraDto {
  @IsInt()
  id: string;
}

export class CreateClientRequestDto {
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
