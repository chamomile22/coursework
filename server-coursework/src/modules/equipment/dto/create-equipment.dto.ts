import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Types } from "mongoose";

export class CreateEquipmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => !Number.isNaN(value) ? +value : undefined)
  cost: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId: Types.ObjectId;
}