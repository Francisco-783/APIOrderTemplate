import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { DatabaseService } from 'src/database/database.service';
import { PromoService } from 'src/promo/promo.service';
import { OrderService } from 'src/order/order.service';
import { ExtraService } from 'src/extra/extra.service';



@Injectable()
export class ClientRequestService {
  constructor(
    private readonly databaseService: DatabaseService, 
    private readonly promoService: PromoService,
    private readonly orderService: OrderService,
    private readonly extraService: ExtraService
  ) {}



  async createClientRequest(data: CreateClientRequestDto) {

    
    try {
      let totalprice = 0;
      let confirmedData = {
        orders: [],
        extras: [],
        promos: []
      }

      function filterClientAdds(orderDBAdds, orderRequest) {

        const filteredOrders = orderDBAdds.filter(add => orderRequest.includes(add.id))
          
        filteredOrders.forEach(adds => {
          const matchingIdObj = orderRequest.find(idObj => idObj.id === adds.id);
          if (matchingIdObj) {
            Object.assign(adds, matchingIdObj); 
          }
        });

        filteredOrders.map(adds => {
          totalprice =+ adds.price * adds.howMany
        })

        return filteredOrders;
      }

         //PROMO PROCESS------------------------------------------------------
        if (data.promos) {
          await Promise.all(
            data.promos.map(async (promo) => {
              const foundPromo = await this.promoService.findOnePromo(promo.promoId);
              let entryData = promo
              totalprice += foundPromo.price;
      
              


              const ordersPromo = foundPromo.orders.map((order) => {
                const orderRequest = entryData.orders.splice(entryData.orders.findIndex(u => u.idOrder === order.id), 1)[0];
              
                return {
                  price: 0,
                  orderid: order.id,
                  adds: orderRequest.adds ? filterClientAdds(order.addItems, orderRequest.adds) : [],
                };
              });
              
              const extraPromo =  foundPromo.extras.map((extra) => {
                return{
                  extraId: extra.id,
                  price: 0,
                }
              })
              

              // Agregar la promoción confirmada a la colección
              confirmedData.promos.push({
                price: foundPromo.price,
                promoid: foundPromo.id,
                Image: foundPromo.image,
                ordersPromo,
                extraPromo
              });
            })
          );
        }
    //----------------------------------------------------------------------  
    //ORDER PROCESS------------------------------------------------------
      if (data.orders)
        {
          await Promise.all(
            data.orders.map(async order => {
              const orderDB = await this.orderService.findOneOrder(order.orderId)

              totalprice =+ orderDB.price

              confirmedData.orders.push({
                price: orderDB.price,
                orderid: orderDB.id,
                adds: order.adds ? filterClientAdds(orderDB.addItems, order.adds) : [],
              })

            })
          )
      }
    
    //---------------------------------------------------------------------- 
    //EXTRA PROCESS------------------------------------------------------
      if (data.extras)
      {
        await Promise.all(
          data.extras.map(async extra =>{
            const extraDB = await this.extraService.findOneExtra(extra.extraId)

            totalprice =+ extraDB.price

            confirmedData.extras.push({
              price: extraDB.price,
              extraid: extraDB.id,

            })
          })
        )

      }

    //DELIVERY PROCESS------------------------------------------------------

    if (data.delivery){
      totalprice += 1000
    }

    //CREATING PROCESS------------------------------------------------------
      const createdClientRequest = await this.databaseService.clientRequest.create({
        data:{
          delivery: data.delivery,
          totalPrice: totalprice,
          orders: {
            create: confirmedData.orders
          },
          extras: {
            create: confirmedData.extras
          },
          promos: {
            create: confirmedData.promos.map((promo) => ({
              price: promo.price,
              promoId: promo.id,
              orders:promo.ordersPromo? {create: promo.ordersPromo}:{} ,
              extras:promo.extraPromo? {create: promo.extraPromo} : {}
            })),
          },
        },
      });

      return createdClientRequest

    }catch (error) {
      console.error('Error while creating Client Request:', error);
      throw error;
    }
  } //END------------------------------------------------------



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
