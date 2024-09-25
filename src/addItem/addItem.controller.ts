import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddItemService } from './addItem.service';
import { CreateAddItemDto } from '../dto/addItem/create-addItem.dto';
import { UpdateAddItemDto } from '../dto/addItem/update-addItem.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('addItem')
export class AddItemController {
  constructor(private readonly addItemService: AddItemService) {}

  @Post()
  create(@Body() createAdditemDto: CreateAddItemDto) {
    return this.addItemService.create(createAdditemDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.addItemService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdditemDto: UpdateAddItemDto) {
    return this.addItemService.update(id, updateAdditemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addItemService.remove(id);
  }
}
