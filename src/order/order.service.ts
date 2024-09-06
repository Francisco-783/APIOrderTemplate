import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dto/order/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/order/update-order.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


type AddItem = {
    name: string;
    value: boolean | number;
    price: number;
};


type Order = {
    id: number;
    name: string;
    image: string;
    description: string;
    visible: boolean;
    add?: AddItem[];
};

@Injectable()
export class OrderService {

    constructor(private readonly databaseModule: DatabaseService) {}

    async findAllOrder(){//if is USER only have to get the visible ones
        try{
        const allOrders = await this.databaseModule.order.findMany({
            include: {
              addItems: true,  // Incluir los aditivos (AddItem) relacionados
            },
          });
       return allOrders
    } catch (error) {
      console.error('Error while getting all orders:', error);
      throw error; 
    }

    }


    async findOneOrder(id: string) {
      try {
          const oneOrder = await this.databaseModule.order.findUnique({
              where: { id },
              include: { addItems: true },
          });
  
          if (!oneOrder) {
              throw new NotFoundException('La orden que quieres obtener no existe');
          }
  
          return oneOrder;
      } catch (error) {
          console.error('Error while getting a Order:', error);
          throw error; 
      }
  }


    async createOrder(order: CreateOrderDTO) {
        try{
            const newOrder = await this.databaseModule.order.create({
                data: {
                  price: order.price,
                  name: order.name,
                  image: order.image,
                  description: order.description,
                  visible: true,
                  createdBy: order.createdBy,
                  addItems: {
                    connect: order.addItemsToConnect,
                    create: order.createAddItem,
                  },
                  
                },
              });
              return newOrder
        }
        catch (error) {
          console.error('Error while creating a Order:', error);
          throw error; 
      }
    }


    async editOrder(id: string, editedOrder: UpdateOrderDTO) {
      try {

          const orderExists = await this.databaseModule.order.findUnique({
              where: { id },
          });
  
          if (!orderExists) {
            throw new NotFoundException('La orden que quieres editar no existe');
        }
  
          const updatedOrder = await this.databaseModule.order.update({
              where: { id },
              data: {
                  name: editedOrder.name,
                  image: editedOrder.image,
                  description: editedOrder.description,
                  visible: editedOrder.visible,
                  addItems: {
                      connect: editedOrder.addItemsToConnect,
                      create: editedOrder.createAddItem,
                  },
              },
          });
  
          return updatedOrder;
      } catch (error) {
          console.error("Error editing order:", error);
          throw error; 
      }
  }
  

    async updateOrderVisibility(id: string, visible:boolean) { //delete function
        try {

          const orderExists = await this.databaseModule.order.findUnique({
            where: { id },
        });

        if (!orderExists) {
          throw new NotFoundException('La orden que quieres editar no existe');
      }

          const editedOrder = await this.databaseModule.order.update({
          where: { id },
          data: { visible },
        });;
      
          return editedOrder;
        } catch (error) {
          console.error('Error while deleting a Order:', error);
          throw error;  
      }
      }

}
