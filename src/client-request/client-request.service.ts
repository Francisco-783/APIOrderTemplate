import { Injectable } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientRequestService {
  constructor(private databaseModule: DatabaseService) {}

  async createClientRequest(data: CreateClientRequestDto) {
    return await this.databaseModule.clientRequest.create({
      data: {
        clientId: data.clientId,
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
      }
    });
  }

  async findAllClientRequest() {
    return await this.databaseModule.clientRequest.findMany();
  }

  async findOneClientRequest(id: number) {
    return await this.databaseModule.clientRequest.findUnique({
      where: { id },
    });
  }

  async updateClientRequest(id: number, updateClientRequestDto: UpdateClientRequestDto) {
    return await this.databaseModule.clientRequest.update({
      where: { id },
      data: updateClientRequestDto,
    });
  }

  async removeClientRequest(id: number) {
    return await this.databaseModule.clientRequest.delete({
      where: { id },
    });
  }
}
