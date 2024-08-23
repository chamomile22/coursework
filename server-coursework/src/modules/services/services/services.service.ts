import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, PipelineStage, Types } from "mongoose";
import { ServiceException } from "@module/common/exceptions";
import { EventName } from "../../../common/enums";
import { CreateServiceDto, GetAllServicesDto, UpdateServiceDto } from "../dto";
import { ServiceDocument, ServiceEntity } from "../schemas";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(ServiceEntity.name)
    private readonly serviceModel: Model<ServiceEntity>,
    private readonly eventEmitter: EventEmitter2,
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

  async calculateServicesPrice(ids: Types.ObjectId[]): Promise<number> {
    if (!ids?.length) {
      return 0;
    }

    const services = await this.serviceModel.aggregate<ServiceDocument>([{ $match: { _id: { $in: ids } } }, { $project: { cost: 1 } }]);

    if (ids?.length > services.length) {
      throw new ServiceException("Cannot found all services by provided ids", "NOT_FOUND", "NOT_EXISTS", { ids });
    }

    return services.reduce((result, current) => {
      result += current.cost;

      return result;
    }, 0);
  }

  async create(data: CreateServiceDto, userId: string): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));
      return await this.serviceModel.create({ equipmentIds: ids, ...restParams });
    }

    const result = await this.serviceModel.create(data);

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "New service was created" });

    return result;
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


  async updateById(id: string, data: UpdateServiceDto, userId: string): Promise<ServiceDocument> {
    const { equipmentIds, ...restParams } = data;

    let result: ServiceDocument;
    if (equipmentIds) {
      const ids = equipmentIds.map(item => new Types.ObjectId(item));

      result = await this.serviceModel.findByIdAndUpdate(id, { equipmentIds: ids, ...restParams }, { new: true });
    } else {
      result = await this.serviceModel.findByIdAndUpdate(id, data, { new: true });
    }

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Service was updated" });

    return result;
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

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.serviceModel.deleteOne({ _id: id });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Service was deleted" });

    return result.deletedCount !== 0;
  }
}