import { Injectable, NotFoundException } from '@nestjs/common';

// MAKES THE DTOs

@Injectable()
export class PromoService {
    
    private orders = [
    ]

    findAllPromo(){//if is USER only have to get the visible ones

    }

    findOnePromo(id:number){

    }

    createPromo(/*order: CreateOrderDTO,*/ role?: "USER" | "ADMIN") {

    }

    editPromo(id:number ,/*editedOrder: UpdateOrderDTO,*/ role?: "USER" | "ADMIN"){

    }

    deletePromo(id:number, role?: "USER" | "ADMIN"){

    }

}
