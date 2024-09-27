import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientRequestDto } from '../dto/client-request/create-client-request.dto';
import { UpdateClientRequestDto } from '../dto/client-request/update-client-request.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClientRequestService {
  constructor(private readonly databaseModule: DatabaseService) {}

  async createClientRequest(data: CreateClientRequestDto) {
    try {
  // Obtener los elementos existentes
  const promosExist = await this.databaseModule.promo.findMany({
    where: {
      id: { in: data.promos?.map(promo => promo.id) || [] },
    },
  });

  const ordersExist = await this.databaseModule.order.findMany({
    where: {
      id: { in: data.orders?.map(order => order.id) || [] },
    },
    include: {
      addItems: {
        where: {
          id: { in: data.orders.flatMap(order => order.additemId) }, // Filtrar por los IDs de AddItem solicitados
        },
      },
    },
  });

  const extrasExist = await this.databaseModule.extra.findMany({
      where: {
        id: { in: data.extras?.map(extra => extra.id) || [] },
      },
    });

  // Verificar que todos los elementos existen
  if (
    promosExist.length === data.promos.length &&
    ordersExist.length === data.orders.length &&
    extrasExist.length === data.extras.length
  ) {
// Obtener los precios de los AddItems solicitados
const totalAddItemPrice = ordersExist.reduce((total, order) => {
  const addItemsTotal = order.addItems.reduce((sum, addItem) => sum + addItem.price, 0);
  return total + addItemsTotal;
}, 0);

// Calcular el precio total incluyendo AddItems, Promos y Extras
const totalPrice = [
  ...promosExist.map(promo => promo.price),
  ...ordersExist.map(order => order.price), // Si `order.price` es el precio de la orden, puedes eliminarlo si no es necesario
  ...extrasExist.map(extra => extra.price),
  totalAddItemPrice, // Agregar el precio total de AddItems
].reduce((acc, price) => acc + price, 0);

    // Crear el ClientRequest con el precio total
    return await this.databaseModule.clientRequest.create({
      data: {
        status: data.status,
        delivery: data.delivery,
        totalPrice, // Aquí guardamos el precio total calculado
        promos: {
          connect: promosExist.map(promo => ({ id: promo.id })),
        },
        orders: {
          connect: ordersExist.map(order => ({ id: order.id })),
        },
        extras: {
          connect: extrasExist.map(extra => ({ id: extra.id })),
        },
      },
    });
} else {
  throw new NotFoundException('Algunos items no existen');
}
    } catch (error) {
      console.error('Error while creating Client Request:', error);
      throw error; 
    }
  }



  async findAllClientRequest() {
    try {
      return await this.databaseModule.clientRequest.findMany({        
        include: {
        extras:true, 
        orders:true,
        promos:true 
      }
      });
    } catch (error) {
      console.error('Error while getting all Client Requests:', error);
      throw error; 
    }
  }


  async findOneClientRequest(id: string) {
    try {
      const clientRequest = await this.databaseModule.clientRequest.findUnique({
        where: { id },
        include: {
          extras:true, 
          orders:true,
          promos:true }
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
