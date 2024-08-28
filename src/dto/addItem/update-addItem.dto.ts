import { PartialType } from '@nestjs/mapped-types';
import { CreateAddItemDto } from './create-addItem.dto';

export class UpdateAddItemDto extends PartialType(CreateAddItemDto) {}
