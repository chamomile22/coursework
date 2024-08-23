import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { BaseFilterDto, SortDto } from "../../../common/abstract";

class GetAllEventsFilter extends BaseFilterDto {
  @ApiPropertyOptional({ type: String, name: "filter[userId]" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  userId?: Types.ObjectId;

  @ApiPropertyOptional({ type: String, name: "filter[createdAt]" })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  createdAt?: Date;
}

export class GetAllEventsDto extends SortDto {
  @ApiPropertyOptional({ type: GetAllEventsFilter })
  @IsObject()
  @IsOptional()
  @Type(() => GetAllEventsFilter)
  filter?: GetAllEventsFilter;
}