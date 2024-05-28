import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsObject, IsOptional } from "class-validator";

export class SortDto {
  @ApiPropertyOptional({ type: "object" })
  @IsObject()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return undefined;
    }

    return Object.entries(value).reduce((acc, [key, sorting]) => {
      acc[key] = sorting === "DESC" ? -1 : 1;
      return acc;
    }, {});
  })
  sort?: Record<string, -1 | 1>;
}