import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DepartmentsController } from "./controllers";
import { DepartmentEntity, DepartmentSchema } from "./schemas";
import { DepartmentsService } from "./services";

@Module({
  imports: [MongooseModule.forFeature([{ name: DepartmentEntity.name, schema: DepartmentSchema }])],
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
})
export class DepartmentsModule {}