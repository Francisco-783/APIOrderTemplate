import { Module } from '@nestjs/common';
import { StoreSettingsService } from './store-settings.service';
import { StoreSettingsController } from './store-settings.controller';

@Module({
  controllers: [StoreSettingsController],
  providers: [StoreSettingsService],
})
export class StoreSettingsModule {}
