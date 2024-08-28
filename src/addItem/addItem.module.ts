import { Module } from '@nestjs/common';
import { AddItemService } from './addItem.service';
import { AddItemController } from './addItem.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddItemController],
  providers: [AddItemService],
})
export class AddItemModule {}
