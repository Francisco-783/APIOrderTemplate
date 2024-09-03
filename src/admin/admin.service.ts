import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from 'src/dto/admin/create-admin.dto'; 

@Injectable()
export class AdminService {

  constructor(private readonly databaseModule: DatabaseService) {}

  async create(entryNewAdmin: CreateAdminDto) {
      try{
        const newAdmin = await this.databaseModule.admin.create({
          data: {
            name: entryNewAdmin.name,
            password: entryNewAdmin.password
          },
        });

        return newAdmin
      }
      catch (error){
        console.log('Error while creating a Order:', error)
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
