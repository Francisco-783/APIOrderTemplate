import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from 'src/dto/order/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/order/update-order.dto';
import { Public } from 'src/auth/auth.guard';



@Controller('order')
export class OrderController {

   constructor(private readonly orderService: OrderService) {}

   @Public()
   @Get() //Get /order
   findAllOrder(){
    return this.orderService.findAllOrder(false)
   }


   @Get("admin") //Get /order
   findAllOrderAdmin(){
    return this.orderService.findAllOrder(true)
   }

   @Public()
   @Get(":id") //GET /order/:id
   findOneOrder(@Param("id") id:string){
      return this.orderService.findOneOrder(id, false)
   }

   
   @Get("admin/:id") //GET /order/admin/:id
   findOneOrderAdmin(@Param("id") id:string){
      return this.orderService.findOneOrder(id, true)
   }

   @Post() //POST /order
   createOrder(@Body(ValidationPipe) order:CreateOrderDTO){
      return this.orderService.createOrder(order)
   }

   @Patch(":id") //PATCH /order/:id 
   editOrder(@Body(ValidationPipe) editedOrder: UpdateOrderDTO, @Param("id") id:string ){
        return this.orderService.editOrder(id , editedOrder)
   }

   @Delete(":id") //DELETE /order/:id
   updateOrderVisibility(
      @Param("id") id: string,
      @Query('visible') visible: string
    ) {
      const isVisible = visible === 'true';
    return this.orderService.updateOrderVisibility(id, isVisible)
   }

}
