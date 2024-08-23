import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { EventName } from "../../../common/enums";
import { CreateDepartmentDto, UpdateDepartmentDto, GetAllDepartmentsDto } from "../dto";
import { DepartmentDocument, DepartmentEntity } from "../schemas";

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectModel(DepartmentEntity.name)
    private readonly departmentModel: Model<DepartmentEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateDepartmentDto, userId: string): Promise<DepartmentDocument> {
    const result = await this.departmentModel.create(data);

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "New department was created" });

    return result;
  }

  async getAll(params: GetAllDepartmentsDto): Promise<DepartmentDocument[]> {
    const { filter, sort } = params;

    const where: FilterQuery<DepartmentEntity> = {};
    if (filter) {
      const { ids, name, description } = filter;

      if (name) {
        where.name = { $regex: `.*${name}.*` };
      }

      if (description) {
        where.description = { $regex: `.*${description}.*` };
      }

      if (ids) {
        where._id = { $in: ids };
      }
    }

    return await this.departmentModel
      .find(where)
      .sort(sort);
  }

  async updateById(id: string, data: UpdateDepartmentDto, userId: string): Promise<DepartmentDocument> {
    const result = await this.departmentModel.findByIdAndUpdate(id, data, { new: true });

    await this.eventEmitter.emitAsync(EventName.EventCreated, { userId, type: "Department was updated" });

    return result;
  }

  async findById(id: string): Promise<DepartmentDocument> {
    return await this.departmentModel.findById(id);
  }

  async findOne(data: FilterQuery<DepartmentEntity>): Promise<DepartmentDocument> {
    return await this.departmentModel.findOne(data);
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.departmentModel.deleteOne({ _id: id });

    await this.eventEmitter.emitAsync(EventName.EventCreated, { userId, type: "Department was deleted" });

    return result.deletedCount !== 0;
  }
}