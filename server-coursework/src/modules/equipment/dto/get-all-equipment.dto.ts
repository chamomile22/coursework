import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { BaseFilterDto, SortDto } from "../../../common/abstract";

class GetAllEquipmentFilter extends BaseFilterDto {
  @ApiPropertyOptional({ type: String, name: "filter[departmentId]" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId?: Types.ObjectId;
}

export class GetAllEquipmentDto extends SortDto {
  @ApiPropertyOptional({ type: GetAllEquipmentFilter })
  @IsObject()
  @IsOptional()
  @Type(() => GetAllEquipmentFilter)
  filter?: GetAllEquipmentFilter;
}