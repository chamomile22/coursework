import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateEquipmentDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value ? +value : undefined)
  cost?: number;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId?: Types.ObjectId;
}