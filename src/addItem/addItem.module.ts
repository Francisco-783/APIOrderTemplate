import { Module } from '@nestjs/common';
import { AddItemService } from './addItem.service';
import { AddItemController } from './addItem.controller';

@Module({
  controllers: [AddItemController],
  providers: [AddItemService],
})
export class AddItemModule {}
