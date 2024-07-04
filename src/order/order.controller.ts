import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {

   @Get() //Get /order
   findAll(){
    return []
   }
   @Get(":id") //GET /order/:id
   findOne(@Param("id") id:string){
    return{id}
   }
   @Post() //POST /order
   createOrder(@Body() user:{}){
    return user
   }
   @Patch(":id") //PATCH /order/:id
   editOrder(@Param("id") id:string, @Body() orderUpdate: {}){
        return {id, ...orderUpdate}
   }
   @Delete(":id") //DELETE /order/:id 
   deleteOrder(@Param("id") id:string){
    return{id}
   }
}
