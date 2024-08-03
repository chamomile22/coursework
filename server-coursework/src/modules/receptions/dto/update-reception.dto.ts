import { Prop } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateReceptionDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  @IsOptional()
  patientId?: Types.ObjectId;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  @IsOptional()
  doctorId?: Types.ObjectId;

  @ApiPropertyOptional()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional()
  @Prop({ type: [{ type: Types.ObjectId, ref: "ServiceEntity" }], required: false })
  @IsOptional()
  serviceIds?: Types.ObjectId[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  recommendation?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}