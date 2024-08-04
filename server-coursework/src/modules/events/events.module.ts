import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventController } from "./controllers/events.controller";
import { EventEntity, EventSchema } from "./schemas";
import { EventsService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{ name: EventEntity.name, schema: EventSchema }])],
  providers: [EventsService],
  controllers: [EventController],
})
export class EventsModule {}