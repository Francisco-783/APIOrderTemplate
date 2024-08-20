import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dto/create-order.dto';
import { UpdateOrderDTO } from 'src/dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


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

    constructor(private readonly databaseModule: DatabaseService) {}


    async findAll(){//if is USER only have to get the visible ones
        try{
        const A = await this.databaseModule.order.findMany()
       return A
    } catch (error) {
        console.error('Error fetching users:', error);
      }

    }

    async findOne(id:number){
        try{
            const oneOrder = await this.databaseModule.order.findUnique({
                where: {
                  id: id,  
                },
              });
           return oneOrder
        } catch (error) {
            console.error('Error fetching users:', error);
          }
    }

    async createOrder(order: CreateOrderDTO) {
        try{
            const newOrder = await this.databaseModule.order.create({
                data: {
                  name: order.name,
                  image: order.image,
                  description: order.description,
                  visible: true,
                  addItems: {
                    connect: order.addItemDone,
                    create: order.createAddItem,
                  },
                },
              });
              return newOrder
        }
        catch (error) {
            console.error('Error fetching users:', error);
          }
    }

    editOrder(id:number ,editedOrder: UpdateOrderDTO, role?: "USER" | "ADMIN"){
        this.orders = this.orders.map(order =>{
            if (order.id === id){
                order = {...order, ...editedOrder}
            }
            return order
        })
        return this.findOne(id)
    }

    deleteOrder(id:number, role?: "USER" | "ADMIN"){
        const removedOrder = this.findOne(id)

        this.orders = this.orders.filter(order => order.id !== id)
        console.log("TEST")
        return this.orders
    }

}
