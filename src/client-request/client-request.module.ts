import { Module } from '@nestjs/common';
import { ClientRequestService } from './client-request.service';
import { ClientRequestController } from './client-request.controller';

@Module({
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class ClientRequestModule {}
