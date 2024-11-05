import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto'; 
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto'; 

@Injectable()
export class ExtraService {

  constructor(private readonly databaseModule: DatabaseService) {}


  async findAllExtra(isAdmin: boolean) {

    let result

    try{

    const allExtras = await this.databaseModule.extra.findMany();

    if (!isAdmin){
      result = allExtras.filter(extra => extra.visible === true)
    }
    else{
      result = allExtras
    }
   return result

} 

catch (error) {
  console.error('Error while getting all extras:', error);
  throw error; 
}



}



  async findOneExtra(id: string) {
        try{
            const oneExtra = await this.databaseModule.extra.findUnique({
                where: {
                  id: id,
                },
              });

              if (!oneExtra) {
                throw new NotFoundException('La extra que quieres obtener no existe');
            }

           return oneExtra
        } catch (error) {
          console.error('Error while getting a extra:', error);
          throw error; 
      }
    }



  async createExtra(entryExtra: CreateExtraDto) {
    try{
        const newExtra = await this.databaseModule.extra.create({
            data: {
              name: entryExtra.name,
              price: entryExtra.price,
              image: entryExtra.image,
              visible: entryExtra.visible,
              createdBy: entryExtra.createdBy,
            },
          });
          return newExtra
    }
    catch (error) {
      console.error('Error while creating a extra:', error);
      throw error; 
  }
}


  async editExtra(id: string, entryEditExtra: UpdateExtraDto) {
    try {

      const extraExists = await this.databaseModule.extra.findUnique({
        where: { id },
    });

    if (!extraExists) {
      throw new NotFoundException('La extra que quieres editar no existe');
  }

      const updatedExtra = await this.databaseModule.extra.update({
        where: { id },
        data: {
          name: entryEditExtra.name,
          price: entryEditExtra.price,
          image: entryEditExtra.image,
          visible: entryEditExtra.visible,
        },
      });
  
      return updatedExtra;
    } catch (error) {
      console.error("Error editing extra:", error);
      throw error; 
  }
  }

  

  async updateExtraVisibility(id: string, visible:boolean) {
    try {

      const extraExists = await this.databaseModule.extra.findUnique({
        where: { id },
    });

    if (!extraExists) {
      throw new NotFoundException('La extra que quieres editar no existe');
  }
      const updatedExtra = await this.databaseModule.extra.update({
        where: { id },
        data: { visible },
      });
  
      return updatedExtra;
    } catch (error) {
      console.error('Error while deleting a extra:', error);
      throw error;  
  }
  }
}
