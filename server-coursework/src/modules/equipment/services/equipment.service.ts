import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateEquipmentDto, GetAllEquipmentDto, UpdateEquipmentDto } from "../dto";
import { EquipmentDocument, EquipmentEntity } from "../schemas";

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(EquipmentEntity.name)
    private readonly equipmentModel: Model<EquipmentEntity>,
  ) {}

  async create(data: CreateEquipmentDto): Promise<EquipmentDocument> {
    return this.equipmentModel.create(data);
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

  async updateById(id: string, data: UpdateEquipmentDto): Promise<EquipmentDocument> {
    return await this.equipmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<EquipmentDocument> {
    return await this.equipmentModel.findById(id);
  }

  async findOne(data: FilterQuery<EquipmentEntity>): Promise<EquipmentDocument> {
    return await this.equipmentModel.findOne(data);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.equipmentModel.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}