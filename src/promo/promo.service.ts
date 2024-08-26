import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePromoDTO } from 'src/dto/promo/create-promo.dto'; 


// MAKES THE DTOs

@Injectable()
export class PromoService {

    constructor(private readonly databaseModule: DatabaseService) {}

    async findAllPromo(){
        try{
        const allPromos = await this.databaseModule.promo.findMany({
            include: {
              orders: true, 
              extras: true,
            },
          });
       return allPromos
    } catch (error) {
        console.error('Error fetching users:', error);
      }

    }

    async findOnePromo(id:number){
        try{
            const onePromo = await this.databaseModule.promo.findUnique({
                where: {
                  id: id,
                },
                include: {
                    orders: true, 
                    extras: true,
                },
              });
           return onePromo
        } catch (error) {
            console.error('Error fetching users:', error);
          }
    }


    async createPromo(promo: CreatePromoDTO) {
        try{
            const newOrder = await this.databaseModule.promo.create({
                data: {
                  price: promo.price,
                  name: promo.name,
                  image: promo.image,
                  visible: promo.visible,
                  orders: {
                    connect: promo.ordersToConnect
                  },
                  extras: {
                    connect: promo.extrasToConnect
                  }
                  
                },
              });
              return newOrder
        }
        catch (error) {
            console.error('Error fetching users:', error);
          }
    }

    async editPromo(id: number, updateData) {
        try {
          const updatedPromo = await this.databaseModule.promo.update({
            where: { id },
            data: {
              ...updateData,
              extras: updateData.extrasToConnect?.length
                ? {
                    connect: updateData.extrasToConnect
                  }
                : undefined,
              orders: updateData.ordersToConnect?.length
                ? {
                    connect: updateData.ordersToConnect
                  }
                : undefined,
            },
          });
          return updatedPromo;
        } catch (error) {
          console.error('Error updating promo:', error);
          throw new Error('Failed to update promo');
        }
      }

    deletePromo(id:number, role?: "USER" | "ADMIN"){
        return "delete promo"
    }

}
