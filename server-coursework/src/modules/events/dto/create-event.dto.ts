import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : undefined))
  userId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  type: string;
}