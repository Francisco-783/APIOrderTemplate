import { Module } from '@nestjs/common';
import { ClientRequestService } from './client-request.service';
import { ClientRequestController } from './client-request.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OrderModule } from 'src/order/order.module';
import { ExtraModule } from 'src/extra/extra.module';
import { PromoModule } from 'src/promo/promo.module';

@Module({
  imports: [DatabaseModule, OrderModule, ExtraModule, PromoModule],
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class ClientRequestModule {}
