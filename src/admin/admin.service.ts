import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAdminDto } from 'src/dto/admin/create-admin.dto'; 

@Injectable()
export class AdminService {

  constructor(private readonly databaseModule: DatabaseService) {}

  create(createAdminDto: CreateAdminDto) {

    
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
