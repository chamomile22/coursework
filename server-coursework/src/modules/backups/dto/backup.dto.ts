import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class BackupDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  path?: string;
}