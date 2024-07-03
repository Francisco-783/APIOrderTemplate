import { Controller, Get } from '@nestjs/common';

@Controller('order')
export class OrderController {
    /*
    Get /order
    get /order/:id
    POST /order
    PATCH /order/:id
    DELETE /order/:id 
    */
   @Get()
   findAll
}
