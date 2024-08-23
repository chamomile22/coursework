import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { EventName } from "../../../common/enums";
import { CreateEquipmentDto, GetAllEquipmentDto, UpdateEquipmentDto } from "../dto";
import { EquipmentDocument, EquipmentEntity } from "../schemas";

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(EquipmentEntity.name)
    private readonly equipmentModel: Model<EquipmentEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateEquipmentDto, userId: string): Promise<EquipmentDocument> {
    const result = await this.equipmentModel.create(data);

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "New equipment was created" });

    return result;
  }

  async getAll(params: GetAllEquipmentDto): Promise<EquipmentDocument[]> {
    const { filter, sort } = params;

    const where: FilterQuery<EquipmentEntity> = {};
    if (filter) {
      const { ids, departmentId} = filter;

      if (departmentId) {
        where.departmentId = departmentId;
      }

      if (ids) {
        where._id = { $in: ids };
      }
    }

    return await this.equipmentModel
      .find(where)
      .sort(sort);
  }

  async updateById(id: string, data: UpdateEquipmentDto, userId: string): Promise<EquipmentDocument> {
    const result = await this.equipmentModel.findByIdAndUpdate(id, data, { new: true });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Equipment was updated" });

    return result;
  }

  async findById(id: string): Promise<EquipmentDocument> {
    return await this.equipmentModel.findById(id);
  }

  async findOne(data: FilterQuery<EquipmentEntity>): Promise<EquipmentDocument> {
    return await this.equipmentModel.findOne(data);
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.equipmentModel.deleteOne({ _id: id });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Equipment was deleted" });

    return result.deletedCount !== 0;
  }
}