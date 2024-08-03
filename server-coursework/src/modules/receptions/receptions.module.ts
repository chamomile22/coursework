import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReceptionsController } from "./controllers";
import { ReceptionEntity, ReceptionSchema } from "./schemas";
import { ReceptionsService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{ name: ReceptionEntity.name, schema: ReceptionSchema }])],
  providers: [ReceptionsService],
  controllers: [ReceptionsController],
})
export class ReceptionsModule {}