import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PromoController } from './promo/promo.controller';
import { PromoModule } from './promo/promo.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [OrderModule, DatabaseModule, ThrottlerModule.forRoot([{
    name: "long",
    ttl: 60000,
    limit: 50
  }]), PromoModule, MyLoggerModule],
  controllers: [AppController, PromoController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
