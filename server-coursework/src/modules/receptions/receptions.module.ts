import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServicesModule } from "../services";
import { ReceptionsController } from "./controllers";
import { ReceptionEntity, ReceptionSchema } from "./schemas";
import { ReceptionsService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{
    name: ReceptionEntity.name,
    schema: ReceptionSchema,
  }]), ServicesModule],
  providers: [ReceptionsService],
  controllers: [ReceptionsController],
})
export class ReceptionsModule {}