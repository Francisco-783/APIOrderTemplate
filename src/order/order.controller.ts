import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from 'src/dto/order/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/order/update-order.dto';



@Controller('order')
export class OrderController {

   constructor(private readonly orderService: OrderService) {}

   @Get() //Get /order
   findAllOrder(){
    return this.orderService.findAllOrder()
   }


   @Get(":id") //GET /order/:id
   findOneOrder(@Param("id", ParseIntPipe) id:number){
      return this.orderService.findOneOrder(+id)
   }

   @Post() //POST /order
   createOrder(@Body(ValidationPipe) order:CreateOrderDTO){
      return this.orderService.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id // falta agregar comprobacion que es el admin
   editOrder(@Body(ValidationPipe) editedOrder: UpdateOrderDTO, @Param("id", ParseIntPipe) id:number ){
        return this.orderService.editOrder(+id , editedOrder)
   }

   @Delete(":id") //DELETE /order/:id // falta agregar comprobacion que es el admin
   deleteOrder(@Param("id", ParseIntPipe) id:number){
    return this.orderService.deleteOrder(+id)
   }

}
