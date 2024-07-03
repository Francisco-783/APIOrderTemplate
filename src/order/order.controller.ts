import { Controller, Get, Param } from '@nestjs/common';

@Controller('order')
export class OrderController {
    /*
    Get /order
    GET /order/:id
    POST /order
    PATCH /order/:id
    DELETE /order/:id 
    */
   @Get() //Get /order
   findAll(){
    return []
   }
   @Get(":id") //GET /order/:id
   findOne(@Param("id") id:string){
    return{id}
   }
}
