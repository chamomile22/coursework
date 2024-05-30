import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Types } from "mongoose";

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => !Number.isNaN(value) ? +value : undefined)
  cost: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => !Number.isNaN(value) ? +value : undefined)
  duration: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId: Types.ObjectId;

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsString({ each: true })
  @IsOptional()
  equipmentIds?: string[];
}