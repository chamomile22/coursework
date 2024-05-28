import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class TopicDto {
  @ApiProperty()
  @IsArray()
  topicIds: string[];

  @ApiProperty()
  @IsArray()
  topicCategories: string[];
}
