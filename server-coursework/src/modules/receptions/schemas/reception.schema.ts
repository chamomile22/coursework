import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { HydratedDocument, Model, Types } from "mongoose";

export type ReceptionDocument = HydratedDocument<ReceptionEntity>;

@Schema({
  collection: "receptions",
  timestamps: true,
})
export class ReceptionEntity extends Model {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "UserEntity", required: true })
  patientId: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "UserEntity", required: true })
  doctorId: Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  date: Date;

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: "ServiceEntity" }], required: false })
  serviceIds?: Types.ObjectId[];

  @ApiPropertyOptional()
  @Prop({ required: false })
  diagnosis: string;

  @ApiPropertyOptional()
  @Prop({ required: false })
  recommendation: string;

  @ApiProperty()
  @Prop({ required: true })
  status: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;
}

export const ReceptionSchema = SchemaFactory.createForClass(ReceptionEntity);
