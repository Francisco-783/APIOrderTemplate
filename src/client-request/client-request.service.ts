import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientRequestService {
  constructor(private readonly databaseModule: DatabaseService) {}

  async createClientRequest(data: CreateClientRequestDto) {
    try {
      return await this.databaseModule.clientRequest.create({
        data: {
          status: data.status,
          promos: {
            connect: data.promos?.map(promo => ({ id: promo.id })),
          },
          orders: {
            connect: data.orders?.map(order => ({ id: order.id })),
          },
          extras: {
            connect: data.extras?.map(extra => ({ id: extra.id })),
          },
        },
      });
    } catch (error) {
      console.error('Error while creating Client Request:', error);
      throw error; 
    }
  }



  async findAllClientRequest() {
    try {
      return await this.databaseModule.clientRequest.findMany();
    } catch (error) {
      console.error('Error while getting all Client Requests:', error);
      throw error; 
    }
  }


  async findOneClientRequest(id: string) {
    try {
      const clientRequest = await this.databaseModule.clientRequest.findUnique({
        where: { id },
      });

      if (!clientRequest) {
        throw new NotFoundException('El Client Request que buscas no existe');
      }

      return clientRequest;
    } catch (error) {
      console.error('Error while getting a Client Request:', error);
      throw error; 
    }
  }


  async updateClientRequest(id: string, updateClientRequestDto: UpdateClientRequestDto) {
    try {

      const requestExists = await this.databaseModule.clientRequest.findUnique({
        where: { id },
    });

    if (!requestExists) {
      throw new NotFoundException('el pedido que quieres editar no existe');
  }

      return await this.databaseModule.clientRequest.update({
        where: { id },
        data: updateClientRequestDto,
      });
    } catch (error) {
      console.error('Error while updating Client Request:', error);
      throw error; 
    }
  }


}
