import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
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
import { EventsModule } from "./modules/events";
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
    EventsModule,
    EventEmitterModule.forRoot(
      {// set this to `true` to use wildcards
        wildcard: false,
        // the delimiter used to segment namespaces
        delimiter: ".",
        // set this to `true` if you want to emit the newListener event
        newListener: false,
        // set this to `true` if you want to emit the removeListener event
        removeListener: false,
        // the maximum amount of listeners that can be assigned to an event
        maxListeners: 10,
        // show event name in memory leak message when more than maximum amount of listeners is assigned
        verboseMemoryLeak: false,
        // disable throwing uncaughtException if an error event is emitted and it has no listeners
        ignoreErrors: false,
      },
    ),
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
