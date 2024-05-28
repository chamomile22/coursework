import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsDate()
  @Transform(({value}) => value ? new Date(value) : undefined)
  birthDate: Date;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password?: string;
}