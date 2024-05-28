import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Model } from "mongoose";

export type DepartmentDocument = HydratedDocument<DepartmentEntity>;

@Schema({
  collection: "departments",
  timestamps: true,
})
export class DepartmentEntity extends Model {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(DepartmentEntity);
