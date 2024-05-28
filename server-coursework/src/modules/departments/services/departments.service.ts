import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CreateDepartmentDto, UpdateDepartmentDto, GetAllDepartmentsDto } from "../dto";
import { DepartmentDocument, DepartmentEntity } from "../schemas";

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectModel(DepartmentEntity.name)
    private readonly departmentModel: Model<DepartmentEntity>,
  ) {}

  async create(data: CreateDepartmentDto): Promise<DepartmentDocument> {
    return this.departmentModel.create(data);
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

  async updateById(id: string, data: UpdateDepartmentDto): Promise<DepartmentDocument> {
    return await this.departmentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<DepartmentDocument> {
    return await this.departmentModel.findById(id);
  }

  async findOne(data: FilterQuery<DepartmentEntity>): Promise<DepartmentDocument> {
    return await this.departmentModel.findOne(data);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.departmentModel.deleteOne({ _id: id });
    return result.deletedCount !== 0;
  }
}