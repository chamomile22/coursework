import { Module } from "@nestjs/common";
import { BackupsController } from "./controllers";
import { BackupsService } from "./services";

@Module({
  controllers: [BackupsController],
  providers: [BackupsService]
})
export class BackupsModule {}