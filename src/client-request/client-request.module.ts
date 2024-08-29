import { Module } from '@nestjs/common';
import { ClientRequestService } from './client-request.service';
import { ClientRequestController } from './client-request.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class ClientRequestModule {}
