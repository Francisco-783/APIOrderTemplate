import { Injectable } from '@nestjs/common';


type AddItem = {
    name: string;
    value: boolean | number;
    price: number;
};


type Order = {
    id: number;
    name: string;
    image: string;
    description: string;
    visible: boolean;
    add?: AddItem[];
};

@Injectable()
export class OrderService {
    
    private orders: Order[] = [
        {
            id: 1,
            name: "cheese burger",
            image:"https://www.mostachos.com.ar/adm/files/articulos/1712868317.jpg",
            description: "Includes filing, moisturizing, and permanent polish application.",
            visible: true,
            add: [{name:"Medallon Extra", value:false, price:700},{name:"Porcion de Papas Extra", value:3, price:700},{name:"Panceta Extra", value:false, price:700}]
        }
    ]

    findAll(role?: "USER"| "ADMIN"){//if is USER only have to get the visible ones
        if (role === "ADMIN"){
            return "ADMIN Request"
        }
        return this.orders
    }

    findOne(id:number){
        const order = this.orders.find(order => order.id === id)
        return order
    }

    createOrder(order: Order, role?: "USER" | "ADMIN") {
        const highestId = this.orders.reduce((max, order) => order.id > max ? order.id : max, 0);

        const newOrder: Order = {
            id: highestId + 1,
            name: order.name,
            image: order.image,
            description: order.description,
            visible: order.visible,
            add: order.add || []
            
        };

        this.orders.push(newOrder);

        return this.orders
    }

    editOrder(editedOrder: Order, role?: "USER" | "ADMIN"){
        this.orders = this.orders.map(order =>{
            if (order.id === editedOrder.id){
                return {...order, ...editedOrder}
            }
            return order
        })
        return this.findOne(editedOrder.id)
    }

    deleteOrder(id:number, role?: "USER" | "ADMIN"){
        const removedOrder = this.findOne(id)

        this.orders= this.orders.filter(order => order.id !== id)

        return removedOrder
    }

}
