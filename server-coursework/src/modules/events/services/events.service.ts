import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { DateTime } from "luxon";
import { FilterQuery, Model } from "mongoose";
import { EventName } from "../../../common/enums";
import { CreateEventDto, GetAllEventsDto, UpdateEventDto } from "../dto";
import { EventDocument, EventEntity } from "../schemas";

export class EventsService {
  constructor(
    @InjectModel(EventEntity.name)
    private readonly eventModel: Model<EventEntity>,
  ) {}

  @OnEvent(EventName.EventCreated, { async: true })
  async create(data: CreateEventDto): Promise<EventDocument> {
    return await this.eventModel.create(data);
  }

  async getAll(params: GetAllEventsDto): Promise<EventDocument[]> {
    const { filter, sort } = params;

    const where: FilterQuery<EventEntity> = {};
    if (filter) {
      const { userId, createdAt } = filter;

      if (userId) {
        where.userId = userId;
      }

      if (createdAt) {
        const start = DateTime.fromJSDate(createdAt).startOf("day").toJSDate();
        const end = DateTime.fromJSDate(createdAt).endOf("day").toJSDate();

        where.createdAt = { $gte: start, $lte: end };
      }
    }

    return await this.eventModel
      .find(where)
      .sort(sort);
  }

  async updateById(id: string, data: UpdateEventDto): Promise<EventDocument> {
    return await this.eventModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<EventDocument> {
    return await this.eventModel.findById(id);
  }

  async findOne(data: FilterQuery<EventEntity>): Promise<EventDocument> {
    return await this.eventModel.findOne(data);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.eventModel.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}