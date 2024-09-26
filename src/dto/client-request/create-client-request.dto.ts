import {  IsOptional, IsEnum, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { RequestStatus } from '@prisma/client';

class PromoDto {
  @IsString()
  id: string;
}

class OrderDto {
  @IsString()
  id: string;
}

class ExtraDto {
  @IsString()
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
