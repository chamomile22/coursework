import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BackupDto } from "../dto";
import { BackupsService } from "../services";

@ApiTags("Backups")
@Controller("backups")
export class BackupsController {
  constructor(
    private readonly backupsService: BackupsService,
  ) {}

  @Post("backup")
  async backup(@Body() data: BackupDto) {
    return await this.backupsService.backup(data);
  }

  @Post("restore")
  async restore(@Body() data: BackupDto) {
    return await this.backupsService.restore(data);
  }
}