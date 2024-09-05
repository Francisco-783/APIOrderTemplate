import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDTO } from 'src/dto/promo/create-promo.dto'; 
import { UpdateOrderDTO } from 'src/dto/order/update-order.dto'; 

@Controller('promo')
export class PromoController {

    constructor (private readonly PromoService: PromoService) {}

    @Get()  //GET -/promo
    findAll(){
     return this.PromoService.findAllPromo()
    }
 
 
    @Get(":id")  // GET -/promo/:idPromo
    findOne(@Param("id") id:string){
       return this.PromoService.findOnePromo(id)
    }
 
    @Post()  // CREATE -/promo/:IdAdmin (BODY DATA)
    createPromo(@Body(ValidationPipe) promo:CreatePromoDTO){
       return this.PromoService.createPromo(promo)
    }
 
    @Patch(":id")  // PATCH-/promo/:idProduct/:IdAdmin
    editPromo(@Body(ValidationPipe) editedPromo: UpdateOrderDTO, @Param("id") id:string ){
         return this.PromoService.editPromo(id, editedPromo)
    }
 
    @Delete(":id")  // DELETE -/promo/:IdAdmin
    updatePromoVisibility(@Param("id") @Body(ValidationPipe) id:string, visible:boolean){
     return this.PromoService.updatePromoVisibility(id, visible)
    }
    

}
