import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateEquipmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => value ? +value : undefined)
  cost: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  departmentId: Types.ObjectId;
}