import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto'; 
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto'; 

@Injectable()
export class ExtraService {

  constructor(private readonly databaseModule: DatabaseService) {}


  async findAllExtra() {//if is USER only have to get the visible ones
    try{

    const allExtras = await this.databaseModule.extra.findMany();

   return allExtras
} catch (error) {
    console.error('Error while getting Extras:', error);
  }

}

  async findOneExtra(id: number) {
        try{
            const oneExtra = await this.databaseModule.extra.findUnique({
                where: {
                  id: id,
                },
              });
           return oneExtra
        } catch (error) {
            console.error('Error while getting a Extra:', error);
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
            },
          });
          return newExtra
    }
    catch (error) {
        console.error('Error while creating Extra:', error);
      }
}

  async editExtra(id: number, entryEditExtra: UpdateExtraDto) {
    try {
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
      console.error("Error while editing Extra:", error);
    }
  }

  async deleteExtra(id: number) {
    try {
      const deletedExtra = await this.databaseModule.extra.delete({
        where: { id },
      });
  
      return deletedExtra;
    } catch (error) {
      console.error("Error while deleting Extra:", error);
    }
  }
}
