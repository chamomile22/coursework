import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EquipmentController } from "./controllers";
import { EquipmentEntity, EquipmentSchema } from "./schemas";
import { EquipmentService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{ name: EquipmentEntity.name, schema: EquipmentSchema }])],
  providers: [EquipmentService],
  controllers: [EquipmentController],
})
export class EquipmentModule {}