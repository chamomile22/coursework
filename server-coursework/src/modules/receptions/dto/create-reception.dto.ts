import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateReceptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  patientId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  doctorId: Types.ObjectId;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date: Date;

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsString({ each: true })
  @IsOptional()
  serviceIds?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  recommendation?: string;

  @ApiProperty()
  @IsString()
  status: string;
}