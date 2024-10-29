import { Body, Controller, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { StoreSettingsService } from './store-settings.service';
import { CreateStoreSettings } from 'src/dto/store-settings/create-store-settings.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('store-settings')
export class StoreSettingsController {
  constructor(private readonly storeSettingsService: StoreSettingsService) {}

  @Public()
  @Get(":id")
  getOneStatus(@Param("id") id:string) {
    return this.storeSettingsService.isStoreOpen(id);
  }

  @Public()
  @Get()
  getAllStatus(){
    return this.storeSettingsService.getAllStoreStatus();
  }

  
  @Patch(":id")
  updateStatus(@Body('isOpen') isOpen: boolean, @Param("id") id:string) {
    return this.storeSettingsService.setIsOpen(isOpen, id);
  }

  @Post()
  createStore(@Body(ValidationPipe) store:CreateStoreSettings){
    return this.storeSettingsService.createStore(store)
  }
}

