import { Injectable, NotFoundException } from '@nestjs/common';

// MAKES THE DTOs

@Injectable()
export class PromoService {
    
    private orders = [
    ]

    findAllPromo(role?: "USER"| "ADMIN"){//if is USER only have to get the visible ones
        if (role === "ADMIN"){
            return "ADMIN Request"
        }
        return this.orders
    }

    findOnePromo(id:number){
        const order = this.orders.find(order => order.id === id)

        if (!order) throw new NotFoundException("order Not found")

        return order
    }

    createPromo(/*order: CreateOrderDTO,*/ role?: "USER" | "ADMIN") {

    }

    editPromo(id:number ,/*editedOrder: UpdateOrderDTO,*/ role?: "USER" | "ADMIN"){

    }

    deletePromo(id:number, role?: "USER" | "ADMIN"){
        const removedOrder = this.findOnePromo(id)

        this.orders = this.orders.filter(order => order.id !== id)
        console.log("TEST")
        return this.orders
    }

}
