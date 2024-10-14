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
      let confirmedData = {
        orders: [],
        extras: [],
        promos: []
      }

      function filterClientAdds(order, orderRequest) {

        // return order.addItems.filter(add => )
              
      }

      async function processPromos(data): Promise<void> {
        if (data.promos) {
          await Promise.all(
            data.promos.map(async (promo) => {
              const foundPromo = await this.promoService.findOnePromo(promo.promoId);
      
              // Sumar el precio de la promoción al total
              totalprice += foundPromo.price;
      
              // Crear el array de órdenes relacionadas con la promoción
              const ordersPromo = foundPromo.orders.map((order) => ({
                price: 0,
                orderid: order.id,
                adds: filterClientAdds(order, "w"),
              }));
      
              // Agregar la promoción confirmada a la colección
              confirmedData.promos.push({
                price: foundPromo.price,
                promoid: foundPromo.id,
                ordersPromo,
              });
            })
          );
        }
      }
    
      const orderCheck = {
        order: "order"
      };
    
      const createdClientRequest = await this.databaseService.clientRequest.create({
        data:{
          delivery: data.delivery,
          totalPrice: totalprice,
          orders: {
            create: confirmedData.orders.map(order => ({
              orderId: order.orderId,
              promoId: order.isPromo || null, // Relacionar con promo si aplica
              adds: {
                create: order.adds.map(add => ({
                  addItemId: add.addItemId,
                  howMany: add.howMany,
                  price: 0, // Asigna un precio si es necesario
                })),
              },
            })),
          },

          // Crear las promociones relacionadas (ClientRequestPromo)
          promos: confirmedData.promos
            ? {
                create: confirmedData.promos.map(promo => ({
                  promoId: promo.promoId,
                  orders: { //this create client request order
                    connect: promo.promoAdds.map(add => ({
                      id: add.idOrder,
                    })),
                  },
                })),
              }
            : undefined,

          // Crear los extras relacionados (ClientRequestExtra)
          extras: confirmedData.extras
            ? {
                create: confirmedData.extras.map(extra => ({
                  extraId: extra.extraId,
                  promoId: extra.promoId || null, // Relacionar con promo si aplica
                  price: 0, // Asigna un precio si es necesario
                })),
              }
            : undefined,
        },
      });

      return createdClientRequest

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
