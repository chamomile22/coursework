import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { HydratedDocument, Model, Types } from "mongoose";

import { UserRole } from "../enums";

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({
  collection: "users",
  timestamps: true,
})
export class UserEntity extends Model {
  @ApiProperty()
  @Prop({ required: true })
  fullName: string;

  @ApiProperty()
  @Prop({ required: true })
  birthDate: Date;

  @ApiProperty()
  @Prop({ required: true })
  phone: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, select: false })
  password: string;

  @ApiPropertyOptional()
  @Prop({ required: false })
  specialty?: string;

  @ApiPropertyOptional()
  @Prop({ type: Types.ObjectId, ref: "DepartmentEntity", required: false })
  departmentId?: Types.ObjectId;

  @ApiProperty({ enum: UserRole })
  @Prop({ type: Number, required: true, enum: UserRole, default: UserRole.PATIENT })
  roleId: number;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
