import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from 'src/dto/admin/create-admin.dto'; 

@Injectable()
export class AdminService {

  constructor(private readonly databaseModule: DatabaseService) {}

  async create(entryNewAdmin: CreateAdminDto) {
      try{
        const adminExists = await this.databaseModule.admin.findUnique({
          where: { name: entryNewAdmin.name },
      });
      if (!adminExists){
          const newAdmin = await this.databaseModule.admin.create({
            data: {
              name: entryNewAdmin.name,
              password: entryNewAdmin.password
            },
          });

          return newAdmin
      }
      else {
        throw new BadRequestException('Error: name already in use');
      }
      }
      catch (error) {
        console.error('Error while creting admin:', error);
        throw error; 
      }
  }

  async findOneAdmin(name: string) {
    try {
        const oneOrder = await this.databaseModule.admin.findUnique({
            where: { name },
            
        });

        if (!oneOrder) {
            throw new NotFoundException('No admin has that name');
        }

        return oneOrder;
    } catch (error) {
        console.error('Error while getting a Order:', error);
        throw error; 
    }
}

  async findAll() {

      try{

        const allAdmins = await this.databaseModule.admin.findMany();

       return allAdmins

    } catch (error) {
        console.error('Error while getting Admins:', error);
      }
  }

  async logIn(name: string, password: string) {
    try{

       return "TUCKY"
    } catch (error) {
        console.error('Error while getting a Order:', error);
      }
}
}
