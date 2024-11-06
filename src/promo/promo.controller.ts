import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, ValidationPipe } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDTO } from 'src/dto/promo/create-promo.dto'; 
import { UpdateOrderDTO } from 'src/dto/order/update-order.dto'; 
import { Public } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request as ExpressRequest } from 'express';

@Controller('promo')
export class PromoController {

    constructor (
      private readonly PromoService: PromoService,
      private readonly authService: AuthService
    ) {}

   
    @Get('test')
    TESTINGSTUFF(@Request() req: ExpressRequest) {
      return this.authService.getAdminId(req) +"DSDSDSD"
    }
   
    @Public()
    @Get()  //GET -/promo
    findAll(){
     return this.PromoService.findAllPromo(false)
    }

    @Get("admin")  //GET -/promo
    findAllAdmin(){
     return this.PromoService.findAllPromo(false)
    }
 
    @Public()
    @Get(":id")  // GET -/promo/:idPromo
    findOne(@Param("id") id:string){
       return this.PromoService.findOnePromo(id, false)
    }

    @Get("admin/:id")  // GET -/promo/:idPromo
    findOnePromoAdmin(@Param("id") id:string){
       return this.PromoService.findOnePromo(id, false)
    }
 
    @Post()  // CREATE -/promo/:IdAdmin (BODY DATA)
    createPromo(@Body(ValidationPipe) promo:CreatePromoDTO, ){
       return this.PromoService.createPromo(promo)
    }
 
    @Patch(":id")  // PATCH-/promo/:idProduct/:IdAdmin
    editPromo(@Body(ValidationPipe) editedPromo: UpdateOrderDTO, @Param("id") id:string ){
         return this.PromoService.editPromo(id, editedPromo)
    }
 
    @Delete(":id")
      updatePromoVisibility(
      @Param("id") id: string,
      @Query('visible') visible: string
   ) {
      const isVisible = visible === 'true';
      return this.PromoService.updatePromoVisibility(id, isVisible);
   }


}
