import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { BaseFilterDto, SortDto } from "../../../common/abstract";
import { UserRole } from "../enums";

class GetAllUsersFilter extends BaseFilterDto {
  @ApiPropertyOptional({ name: "filter[email]" })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole, name: "filter[roleId]" })
  @IsEnum(UserRole)
  @IsOptional()
  roleId?: number;

  @ApiPropertyOptional({name: "filter[departmentId]"})
  @IsString()
  @IsOptional()
  departmentId?: string;
}

export class GetAllUsersDto extends SortDto {
  @ApiPropertyOptional({ type: GetAllUsersFilter })
  @IsObject()
  @IsOptional()
  @Type(() => GetAllUsersFilter)
  filter?: GetAllUsersFilter;
}