import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class BaseFilterDto {
  @ApiPropertyOptional({name: "filter[ids]"})
  @IsOptional()
  @IsArray()
  ids?: string[];
}
