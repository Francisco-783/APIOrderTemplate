import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/update-order.dto';



@Controller('order')
export class OrderController {

   constructor (private readonly OrderService: OrderService) {}

   @Get() //Get /order
   findAll(@Query("role") role?: "USER"| "ADMIN"){
    return this.OrderService.findAll(role)
   }

   @Get(":id") //GET /order/:id
   findOne(@Param("id", ParseIntPipe) id:number){
      return this.OrderService.findOne(id)
   }

   @Post() //POST /order
   createOrder(@Body(ValidationPipe) order:CreateOrderDTO){
      return this.OrderService.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id
   editOrder(@Body(ValidationPipe) editedOrder: UpdateOrderDTO, @Param("id", ParseIntPipe) id:number ){
        return this.OrderService.editOrder(id , editedOrder)
   }

   @Delete(":id") //DELETE /order/:id 
   deleteOrder(@Param("id", ParseIntPipe) id:number){
    return this.OrderService.deleteOrder(id)
   }

}
