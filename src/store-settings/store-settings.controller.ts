import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { StoreSettingsService } from './store-settings.service';

@Controller('store-settings')
export class StoreSettingsController {
  constructor(private readonly storeSettingsService: StoreSettingsService) {}

  @Get(":id")
  getOneStatus(@Param("id") id:string) {
    return this.storeSettingsService.isStoreOpen(id);
  }

  @Get()
  getAllStatus(){
    return this.storeSettingsService.getAllStoreStatus();
  }

  @Patch(":id")
  async updateStatus(@Body('isOpen') isOpen: boolean, @Param("id") id:string) {
    return this.storeSettingsService.setIsOpen(isOpen, id);
  }
}

