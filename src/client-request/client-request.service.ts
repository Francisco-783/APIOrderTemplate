import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { DatabaseService } from 'src/database/database.service';//prisma
import { PromoService } from 'src/promo/promo.service';



@Injectable()
export class ClientRequestService {
  constructor(
    private readonly databaseService: DatabaseService, 
    private readonly promoService: PromoService
  ) {}



  async createClientRequest(data: CreateClientRequestDto) {

    
    try {
      let totalprice = 0;
    
      const promoCheck = {
        promos: data.promos ? await Promise.all(
          data.promos.map(async promo => {
            const foundPromo = await this.promoService.findOnePromo(promo.promoId);
            
            return foundPromo;
          })
        ) : []
      };
    
      const orderCheck = {
        tumama: "tumama"
      };
    
      return promoCheck;
    }catch (error) {
      console.error('Error while creating Client Request:', error);
      throw error;
    }
  } //END



  // Obtener todas las solicitudes de cliente
  async findAllClientRequest() {
    try {
      return await this.databaseService.clientRequest.findMany({
        include: {
          orders: {
            include: {
              adds: true,
            },
          },
          extras: true,
          promos: true,
        },
      });
    } catch (error) {
      console.error('Error while getting all Client Requests:', error);
      throw error;
    }
  }

  // Obtener una solicitud de cliente por ID
  async findOneClientRequest(id: string) {
    try {
      return await this.databaseService.clientRequest.findUnique({
        where: { id },
        include: {
          orders: {
            include: {
              adds: true,
            },
          },
          extras: true,
          promos: true,
        },
      });
    } catch (error) {
      console.error('Error while getting a Client Request:', error);
      throw error;
    }
  }

  async updateClientRequest(id: string, updateClientRequestDto: UpdateClientRequestDto) {
    try {

      const requestExists = await this.databaseService.clientRequest.findUnique({
        where: { id },
    });

    if (!requestExists) {
      throw new NotFoundException('el pedido que quieres editar no existe');
  }

      return await this.databaseService.clientRequest.update({
        where: { id },
        data: updateClientRequestDto,
      });
    } catch (error) {
      console.error('Error while updating Client Request:', error);
      throw error; 
    }
  }

  
}
