import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateEventDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  @IsOptional()
  userId?: Types.ObjectId;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;
}