import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

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

@Controller('order')
export class OrderController {

   constructor (private readonly OrderService: OrderService) {}

   @Get() //Get /order
   findAll(@Query("role") role?: "USER"| "ADMIN"){
    return this.OrderService.findAll(role)
   }

   @Get(":id") //GET /order/:id
   findOne(@Param("id") id:string){
      return this.OrderService.findOne(+id)
   }

   @Post() //POST /order
   createOrder(@Body() order:Order){
      return this.OrderService.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id
   editOrder(@Body() editedOrder: Order, @Param("id") id:number ){ //ESTO SE TIENE QUE CAMBIAR APRA QUE RECIBA EL ID Y LA COMIDA CAMBIADA SEA LA DEFINIDA POR EL ID
        return this.OrderService.editOrder(+id ,editedOrder)
   }

   @Delete(":id") //DELETE /order/:id 
   deleteOrder(@Param("id") id:number){ //no anda
    return this.OrderService.deleteOrder(+id)
   }

}
