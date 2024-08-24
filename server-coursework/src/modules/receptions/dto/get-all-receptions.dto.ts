import { Prop } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { BaseFilterDto, SortDto } from "../../../common/abstract";
import { ReceptionStatus } from "../enums";

class GetAllReceptionsFilter extends BaseFilterDto {
  @ApiPropertyOptional({ name: "filter[patientId]" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  patientId?: Types.ObjectId;

  @ApiPropertyOptional({ name: "filter[departmentId]" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId?: Types.ObjectId;

  @ApiPropertyOptional({ name: "filter[doctorId]" })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  doctorId?: Types.ObjectId;

  @ApiPropertyOptional({ name: "filter[date]" })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date?: Date;

  @ApiPropertyOptional({ name: "filter[serviceIds]" })
  @Prop({ type: [{ type: Types.ObjectId, ref: "ServiceEntity" }], required: false })
  serviceIds?: Types.ObjectId[];

  @ApiPropertyOptional({ name: "filter[diagnosis]" })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({ name: "filter[recommendation]" })
  @IsString()
  @IsOptional()
  recommendation?: string;

  @ApiPropertyOptional({ name: "filter[status]" })
  @IsEnum(ReceptionStatus)
  @IsOptional()
  status?: ReceptionStatus;
}

export class GetAllReceptionsDto extends SortDto {
  @ApiPropertyOptional({ type: GetAllReceptionsFilter })
  @IsObject()
  @IsOptional()
  @Type(() => GetAllReceptionsFilter)
  filter?: GetAllReceptionsFilter;
}