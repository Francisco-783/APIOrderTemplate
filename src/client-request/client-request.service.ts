import { Injectable } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';

@Injectable()
export class ClientRequestService {
  create(createClientRequestDto: CreateClientRequestDto) {
    return 'This action adds a new clientRequest';
  }

  findAll() {
    return `This action returns all clientRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientRequest`;
  }

  update(id: number, updateClientRequestDto: UpdateClientRequestDto) {
    return `This action updates a #${id} clientRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientRequest`;
  }
}
