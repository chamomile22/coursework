import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServicesController } from "./controllers";
import { ServiceEntity, ServiceSchema } from "./schemas";
import { ServicesService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{ name: ServiceEntity.name, schema: ServiceSchema }])],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}