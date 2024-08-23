import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BackupsService } from "../services";

@ApiTags("Backups")
@Controller("backups")
export class BackupsController {
  constructor(
    private readonly backupsService: BackupsService,
  ) {}

  @Post("backup")
  async backup() {
    return await this.backupsService.backup();
  }

  @Post("restore")
  async restore() {
    return await this.backupsService.restore();
  }
}