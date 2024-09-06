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
      console.error('Error while getting all promos:', error);
      throw error; 
    }

    }



    async findOnePromo(id:string){
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

              if (!onePromo) {
                throw new NotFoundException('La Promo que quieres obtener no existe');
            }

           return onePromo
        } catch (error) {
          console.error('Error while getting a Promo:', error);
          throw error; 
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
                  createdBy: promo.createdBy,
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
      console.error('Error while creating a promo:', error);
      throw error; 
    }
    }



    async editPromo(id: string, updateData) {
        try {

          const promoExists = await this.databaseModule.promo.findUnique({
            where: { id },
        });

        if (!promoExists) {
          throw new NotFoundException('La promo que quieres editar no existe');
      }



          const updatedPromo = await this.databaseModule.promo.update({
            where: {
              id: id,
            },
            data: {
              price: updateData.price,
              name: updateData.name,
              image: updateData.image,
              visible: updateData.visible,
              orders: {
                connect: updateData.ordersToConnect
              },
              extras: {
                connect: updateData.extrasToConnect
              }
              
            },
          });
          return updatedPromo;
        } catch (error) {
          console.error("Error editing promo:", error);
          throw error; 
      }
      }



      async updatePromoVisibility(id: string, visible: boolean) {

        const promoExists = await this.databaseModule.promo.findUnique({
          where: { id },
      });

      if (!promoExists) {
        throw new NotFoundException('La promo que quieres editar no existe');
    }
    
        try {
          const updatedPromo = await this.databaseModule.promo.update({
            where: { id },
            data: { visible: visible }
          });
      
          return updatedPromo;
        } catch (error) {
          console.error("Error updating Promo visibility:", error);
          throw error;
        }
      }


}
