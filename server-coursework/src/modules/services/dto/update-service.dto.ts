import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Types } from "mongoose";

export class UpdateServiceDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => value ? +value : undefined)
  cost?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => value ? +value : undefined)
  duration?: number;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId?: Types.ObjectId;

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsString({ each: true })
  @IsOptional()
  equipmentIds?: string[];
}