import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";

import { ContextModule, HttpContextMiddleware } from "./common/context";
import {
  GlobalAnyExceptionFilter,
  GlobalBadRequestExceptionFilter,
  GlobalHttpExceptionFilter,
  GlobalServiceExceptionFilter,
} from "./common/filters";
import { HttpLoggerMiddleware, LoggerModule } from "./common/logger";
import { ConfigModule } from "./config";
import { MONGOOSE_CONFIG } from "./database";
import { AuthModule } from "./modules/auth";
import { DepartmentsModule } from "./modules/departments";
import { EquipmentModule } from "./modules/equipment";
import { ReceptionsModule } from "./modules/receptions";
import { ServicesModule } from "./modules/services";
import { UsersModule } from "./modules/users";

@Module({
  imports: [
    AuthModule,
    DepartmentsModule,
    UsersModule,
    EquipmentModule,
    ServicesModule,
    ReceptionsModule,
    ConfigModule,
    LoggerModule,
    ContextModule,
    MongooseModule.forRootAsync(MONGOOSE_CONFIG),
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: GlobalAnyExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalBadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalHttpExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalServiceExceptionFilter },
  ],
})
export class AppModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer): void {
    // (.*) is for fastify
    consumer.apply(HttpContextMiddleware).forRoutes("*").apply(HttpLoggerMiddleware).forRoutes("*");
  }
}
