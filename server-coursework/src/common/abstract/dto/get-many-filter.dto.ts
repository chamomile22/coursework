import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class GetManyFilterDto {
  @ApiProperty()
  @IsArray()
  ids: string[];
}
