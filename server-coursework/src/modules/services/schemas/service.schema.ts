import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Model, Types } from "mongoose";

export type ServiceDocument = HydratedDocument<ServiceEntity>;

@Schema({
  collection: "services",
  timestamps: true,
})
export class ServiceEntity extends Model {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: true })
  cost: number;

  @ApiProperty()
  @Prop({ required: true })
  duration: number;

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: "EquipmentEntity" }], required: false })
  equipmentIds?: Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "DepartmentEntity", required: true })
  departmentId: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
