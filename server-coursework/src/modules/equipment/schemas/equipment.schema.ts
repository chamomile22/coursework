import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Model, Types } from "mongoose";

export type EquipmentDocument = HydratedDocument<EquipmentEntity>;

@Schema({
  collection: "equipment",
  timestamps: true,
})
export class EquipmentEntity extends Model {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  cost: number;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "DepartmentEntity", required: true })
  departmentId: Types.ObjectId;
}

export const EquipmentSchema = SchemaFactory.createForClass(EquipmentEntity);
