import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, PipelineStage, Types } from "mongoose";
import { ServiceException } from "@module/common/exceptions";
import { CreateServiceDto, GetAllServicesDto, UpdateServiceDto } from "../dto";
import { ServiceDocument, ServiceEntity } from "../schemas";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceEntity.name)
    private readonly serviceModel: Model<ServiceEntity>,
  ) {}

  private configureDefaultLookupOptions(): PipelineStage[] {
    return [
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      { $addFields: { "department": "$department.name" } },
      {
        $unwind: { path: "$department" },
      },
    ];
  }

  async create(data: CreateServiceDto): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));
      return await this.serviceModel.create({ equipmentIds: ids, ...restParams });
    }

    return await this.serviceModel.create(data);
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

    const additionalPipelines: PipelineStage[] = [{ $match: where }];

    if (sort) {
      additionalPipelines.push({ $sort: sort });
    }

    return await this.serviceModel.aggregate<ServiceDocument>([
      ...additionalPipelines,
      ...this.configureDefaultLookupOptions(),
    ]);
  }


  async updateById(id: string, data: UpdateServiceDto): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));
      return await this.serviceModel.findByIdAndUpdate(id, { equipmentIds: ids, ...restParams }, { new: true });
    }

    return await this.serviceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<ServiceDocument> {
    const result = await this.serviceModel.aggregate<ServiceDocument>([
      { $match: { _id: new Types.ObjectId(id) } },
      ...this.configureDefaultLookupOptions(),
    ]);

    if (!result?.length) {
      throw new ServiceException("Service was not found");
    }

    return result[0];
  }

  async findOne(data: FilterQuery<ServiceEntity>): Promise<ServiceDocument> {
    return await this.serviceModel.findOne(data);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.serviceModel.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}