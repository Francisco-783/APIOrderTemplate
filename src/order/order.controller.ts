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
   findOneOrder(@Param("id") id:string){
      return this.orderService.findOneOrder(id)
   }

   @Post() //POST /order
   createOrder(@Body(ValidationPipe) order:CreateOrderDTO){
      return this.orderService.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id // falta agregar comprobacion que es el admin
   editOrder(@Body(ValidationPipe) editedOrder: UpdateOrderDTO, @Param("id") id:string ){
        return this.orderService.editOrder(id , editedOrder)
   }

   @Delete(":id") //DELETE /order/:id // falta agregar comprobacion que es el admin
   updateOrderVisibility(
      @Param("id") id: string,
      @Query('visible') visible: string
    ) {
      const isVisible = visible === 'true';
    return this.orderService.updateOrderVisibility(id, isVisible)
   }

}
