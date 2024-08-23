import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Model, Types } from "mongoose";

export type EventDocument = HydratedDocument<EventEntity>;

@Schema({
  collection: "events",
  timestamps: true,
})
export class EventEntity extends Model {
  @ApiProperty()
  @Prop({ required: true })
  type: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: "UserEntity", required: true })
  userId: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(EventEntity);
