import { Controller, Get, Param, Query } from '@nestjs/common';
import { StoreSettingsService } from './store-settings.service';

@Controller('store-settings')
export class StoreSettingsController {
  constructor(private readonly storeSettingsService: StoreSettingsService) {}

  @Get(":id")
  getOneStatus(@Param("id") id:string) {
    return this.storeSettingsService.isStoreOpen(id);
  }
}
