import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddItemDto } from '../dto/addItem/create-addItem.dto';
import { UpdateAddItemDto } from '../dto/addItem/update-addItem.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddItemService {
  constructor(private readonly databaseModule: DatabaseService) {}

  async create(createAdditemDto: CreateAddItemDto) {
    try {
      return await this.databaseModule.addItem.create({
        data: createAdditemDto,
      });
    } catch (error) {
      console.error('Error while creating AddItem:', error);
      throw error; // Lanza el error para que sea manejado por NestJS
    }
  }

  async findAll() {
    try {
      return await this.databaseModule.addItem.findMany();
    } catch (error) {
      console.error('Error while getting all AddItems:', error);
      throw error; // Lanza el error para que sea manejado por NestJS
    }
  }

  async findOne(id: string) {
    try {
      const addItem = await this.databaseModule.addItem.findUnique({
        where: { id },
      });

      if (!addItem) {
        throw new NotFoundException('El aditivo que buscas no existe');
      }

      return addItem;
    } catch (error) {
      console.error('Error while getting AddItem:', error);
      throw error; 
    }
  }

  async update(id: string, updateAdditemDto: UpdateAddItemDto) {
    try {

      const addItemExists = await this.databaseModule.addItem.findUnique({
        where: { id },
    });

    if (!addItemExists) {
      throw new NotFoundException('El aditivo que quieres editar no existe');
  }

      return await this.databaseModule.addItem.update({
        where: { id },
        data: updateAdditemDto,
      });
    } catch (error) {
      console.error('Error while updating AddItem:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {

      const addItemExists = await this.databaseModule.addItem.findUnique({
        where: { id },
    });

    if (!addItemExists) {
      throw new NotFoundException('El aditivo que quieres eliminar no existe');
  }

      return await this.databaseModule.addItem.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error while deleting AddItem:', error);
      throw error;
    }
  }
}
