import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientRequestService } from './client-request.service';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';

@Controller('client-request')
export class ClientRequestController {
  constructor(private readonly clientRequestService: ClientRequestService) {}

  @Post()
  create(@Body() createClientRequestDto: CreateClientRequestDto) {
    return this.clientRequestService.create(createClientRequestDto);
  }

  @Get()
  findAll() {
    return this.clientRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientRequestDto: UpdateClientRequestDto) {
    return this.clientRequestService.update(+id, updateClientRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientRequestService.remove(+id);
  }
}
