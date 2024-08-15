import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { PromoService } from './promo.service';

@Controller('promo')
export class PromoController {

    constructor (private readonly PromoService: PromoService) {}

    @Get()  //GET -/promo
    findAll(){
     return this.PromoService.findAllPromo()
    }
 
 
    @Get(":id")  // GET -/promo/:idPromo
    findOne(@Param("id", ParseIntPipe) id:number){
       return this.PromoService.findOnePromo(id)
    }
 
    @Post()  // CREATE -/promo/:IdAdmin (BODY DATA)
    createPromo(){
       return this.PromoService.createPromo()
    }
 
    @Patch(":id")  // PATCH-/promo/:idProduct/:IdAdmin
    editPromo(@Body(ValidationPipe) /*editedOrder: UpdateOrderDTO,*/ @Param("id", ParseIntPipe) id:number ){
         return this.PromoService.editPromo(id ,)
    }
 
    @Delete(":id")  // DELETE -/promo/:IdAdmin
    deletePromo(@Param("id", ParseIntPipe) id:number){
     return this.PromoService.deletePromo(id)
    }
    

//     




}
