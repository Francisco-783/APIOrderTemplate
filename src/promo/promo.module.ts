import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';

@Module({
  providers: [PromoService]
})
export class PromoModule {}
