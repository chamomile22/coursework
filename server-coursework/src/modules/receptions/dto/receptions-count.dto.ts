import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class ReceptionsCountDto {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  endDate: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  doctorId: Types.ObjectId;
}