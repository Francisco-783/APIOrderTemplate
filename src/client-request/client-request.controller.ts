import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientRequestService } from './client-request.service';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { Public } from 'src/auth/auth.guard';

type requestAdd = {
  name: string;
  amountOf: number;
  id: string;
}

type requestOrder = {
  id: string;
  name: string;
  adds: requestAdd[]
    }

type extraRequest = {
  extraName: string;
  id: string;
}

  type requestPromo = {
    promoName: string;
    id: string;
    ordersPromo: requestOrder[]
    extrasPromo: extraRequest[]
  }

    type requestobject  = { //la idea de esto es representar como
      
      status: string;
      orders: requestOrder[];
      promos: requestPromo[]
      extras: extraRequest[]
            
  };
//BORRAR ESTO

@Controller('client-request')
export class ClientRequestController {
  constructor(private readonly clientRequestService: ClientRequestService) {}

  @Public()
  @Post()
  create(@Body() createClientRequestDto: CreateClientRequestDto) {
    return this.clientRequestService.createClientRequest(createClientRequestDto);
  }

  @Get()
  findAll() {
    return this.clientRequestService.findAllClientRequest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientRequestService.findOneClientRequest(id);
  }

  @Patch(':id')                  //update state of the request (PENDING, IN_PROGRESS, REJECTED, COMPLETED)
  update(@Param('id') id: string, @Body() updateClientRequestDto: UpdateClientRequestDto) { 
    return this.clientRequestService.updateClientRequest(id, updateClientRequestDto);
  }

  @Public()
  @Post("testing")
  testingnewCreate(@Body() objectHolder: requestobject) {
    return this.clientRequestService.trying(objectHolder);
  }
}
