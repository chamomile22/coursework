import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { CreateServiceDto, GetAllServicesDto, UpdateServiceDto } from "../dto";
import { ServiceDocument, ServiceEntity } from "../schemas";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceEntity.name)
    private readonly equipmentModel: Model<ServiceEntity>,
  ) {}

  async create(data: CreateServiceDto): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));
      return await this.equipmentModel.create({ equipmentIds: ids, ...restParams });
    }

    return await this.equipmentModel.create(data);
  }

  async getAll(params: GetAllServicesDto): Promise<ServiceDocument[]> {
    const { filter, sort } = params;

    const where: FilterQuery<ServiceEntity> = {};
    if (filter) {
      const { ids, departmentId } = filter;

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

  async updateById(id: string, data: UpdateServiceDto): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));
      return await this.equipmentModel.findByIdAndUpdate(id, { equipmentIds: ids, ...restParams }, { new: true });
    }

    return await this.equipmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<ServiceDocument> {
    return await this.equipmentModel.findById(id);
  }

  async findOne(data: FilterQuery<ServiceEntity>): Promise<ServiceDocument> {
    return await this.equipmentModel.findOne(data);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.equipmentModel.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}