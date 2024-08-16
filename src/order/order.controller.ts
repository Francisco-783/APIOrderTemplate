import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/update-order.dto';



@Controller('order')
export class OrderController {

   constructor(private readonly prisma: OrderService) {}

   @Get() //Get /order
   findAll(){
    return this.prisma.findAll()
   }


   @Get(":id") //GET /order/:id
   findOne(@Param("id", ParseIntPipe) id:number){
      return this.prisma.findOne(id)
   }

   @Post() //POST /order
   createOrder(@Body(ValidationPipe) order:CreateOrderDTO){
      return this.prisma.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id // falta agregar comprobacion que es el admin
   editOrder(@Body(ValidationPipe) editedOrder: UpdateOrderDTO, @Param("id", ParseIntPipe) id:number ){
        return this.prisma.editOrder(id , editedOrder)
   }

   @Delete(":id") //DELETE /order/:id // falta agregar comprobacion que es el admin
   deleteOrder(@Param("id", ParseIntPipe) id:number){
    return this.prisma.deleteOrder(id)
   }

}
