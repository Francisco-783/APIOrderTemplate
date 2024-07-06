import { Injectable } from '@nestjs/common';


type AddItem = {
    name: string;
    value: boolean | number; // It seems like value can be either a boolean or a number
    price: number;
};

// Define the type for the order
type Order = {
    id: number;
    name: string;
    image: string;
    description: string;
    visible: boolean;
    add: AddItem[];
};

@Injectable()
export class OrderService {
    
    private orders= [
        {
              id: 1,
              name: "cheese burger",
              image:"https://www.mostachos.com.ar/adm/files/articulos/1712868317.jpg",
              description: "Includes filing, moisturizing, and permanent polish application.",
              visible: true,
              add: [{name:"Medallon Extra", value:false, price:700},{name:"Porcion de Papas Extra", value:3, price:700},{name:"Panceta Extra", value:false, price:700}]
        }
    ]
    findAll(role?: "USER"| "ADMIN"){
        if (role === "ADMIN"){
            return "PESUTI"
        }
        return this.orders
    }
    findOne(id:number){
        const order = this.orders.find(order => order.id === id)
        return order
    }
    createOrder(order: Order) {

    }
}
