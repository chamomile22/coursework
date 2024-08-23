import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, PipelineStage } from "mongoose";
import { EventName } from "../../../common/enums";

import { GetAllUsersDto, UpdateUserDto } from "../dto";
import { UserRole } from "../enums";
import { UserDocument, UserEntity } from "../schemas";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(data: Partial<UserEntity>, userId: string): Promise<UserDocument> {
    const result = await this.userModel.create(data);

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "New user was registered" });

    return result;
  }

  async getAll(params: GetAllUsersDto): Promise<UserDocument[]> {
    const { filter, sort } = params;

    const where: FilterQuery<UserEntity> = {};
    if (filter) {
      const { ids, roleId, email, departmentId } = filter;

      if (roleId) {
        where.roleId = roleId;
      }

      if (ids) {
        where.ids = { $in: ids };
      }

      if (departmentId) {
        where.departmentId = departmentId;
      }

      if (email) {
        where.email = { $regex: `.*${email}.*` };
      }
    }

    return await this.userModel
      .find(where)
      .sort(sort);
  }

  async getDoctorsWithDepartment(params: GetAllUsersDto): Promise<UserDocument[]> {
    const additionalPipelines: PipelineStage[] = [{ $match: { roleId: UserRole.DOCTOR } }];

    if (params.sort) {
      additionalPipelines.push({ $sort: params.sort });
    }

    return await this.userModel.aggregate<UserDocument>([
      ...additionalPipelines,
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
    ]);
  }

  async updateById(id: string, data: UpdateUserDto, userId: string): Promise<UserDocument> {
    const result = await this.userModel.findByIdAndUpdate(id, data, { new: true });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "User was updated" });

    return result;
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async findOne(data: FilterQuery<UserEntity>): Promise<UserDocument> {
    return await this.userModel.findOne(data);
  }

  async findOneWithPassword(data: FilterQuery<UserEntity>): Promise<UserDocument> {
    return await this.userModel.findOne(data).select("+password").exec();
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: id });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "User was deleted" });

    return result.deletedCount !== 0;
  }
}
