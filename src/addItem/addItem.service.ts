import { Injectable } from '@nestjs/common';
import { CreateAddItemDto } from '../dto/addItem/create-addItem.dto';
import { UpdateAddItemDto } from '../dto/addItem/update-addItem.dto';

@Injectable()
export class AddItemService {
  create(createAdditemDto: CreateAddItemDto) {
    return 'This action adds a new addItem';
  }

  findAll() {
    return `This action returns all addItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addItem`;
  }

  update(id: number, updateAdditemDto: UpdateAddItemDto) {
    return `This action updates a #${id} addItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} addItem`;
  }
}
