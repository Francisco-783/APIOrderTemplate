import { Injectable } from '@nestjs/common';
import { CreateAddItemDto } from '../dto/addItem/create-addItem.dto';
import { UpdateAddItemDto } from '../dto/addItem/update-addItem.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddItemService {
  constructor(private prisma: DatabaseService) {}

  async create(createAdditemDto: CreateAddItemDto) {
    return await this.prisma.addItem.create({
      data: createAdditemDto,
    });
  }

  async findAll() {
    return await this.prisma.addItem.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.addItem.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAdditemDto: UpdateAddItemDto) {
    return await this.prisma.addItem.update({
      where: { id },
      data: updateAdditemDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.addItem.delete({
      where: { id },
    });
  }
}