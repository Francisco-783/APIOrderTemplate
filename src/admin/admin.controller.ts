import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from 'src/dto/admin/create-admin.dto'; 

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get("getAll")
  findAll() {
    return this.adminService.findAll();
  }

  @Get()
  logIn(@Body() name: string, password: string) {
    return this.adminService.logIn(name, password);
  }


}
