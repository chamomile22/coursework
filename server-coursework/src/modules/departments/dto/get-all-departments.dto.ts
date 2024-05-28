import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString } from "class-validator";
import { BaseFilterDto, SortDto } from "../../../common/abstract";

class GetAllDepartmentsFilter extends BaseFilterDto {
  @ApiPropertyOptional({ name: "filter[name]" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ name: "filter[description]" })
  @IsString()
  @IsOptional()
  description?: number;
}

export class GetAllDepartmentsDto extends SortDto {
  @ApiPropertyOptional({ type: GetAllDepartmentsFilter })
  @IsObject()
  @IsOptional()
  @Type(() => GetAllDepartmentsFilter)
  filter?: GetAllDepartmentsFilter;
}