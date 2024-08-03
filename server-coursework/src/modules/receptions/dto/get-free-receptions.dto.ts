import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate } from "class-validator";

export class GetFreeReceptionsDto {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date: Date;
}