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
import { ExtraModule } from './extra/extra.module';
import { AddItemModule } from './addItem/addItem.module';
import { ClientRequestModule } from './client-request/client-request.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { StoreSettingsModule } from './store-settings/store-settings.module';

@Module({
  imports: [OrderModule, DatabaseModule, ThrottlerModule.forRoot([{
    name: "long",
    ttl: 60000,
    limit: 50
  }]), PromoModule, MyLoggerModule, ExtraModule, AddItemModule, ClientRequestModule, AdminModule, AuthModule, StoreSettingsModule],
  controllers: [AppController, PromoController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard, // Añades el AuthGuard de autenticación
  },],
})
export class AppModule {}
