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
    console.error('Error fetching users:', error);
  }

}

  async findOneExtra(id: number) {
    return `This action returns a #${id} extra`;
  }

  async createExtra(createExtraDto: CreateExtraDto) {
    return 'This action adds a new extra';
  }

  async editExtra(id: number, updateExtraDto: UpdateExtraDto) {
    return `This action updates a #${id} extra`;
  }

  async deleteExtra(id: number) {
    return `This action removes a #${id} extra`;
  }
}
