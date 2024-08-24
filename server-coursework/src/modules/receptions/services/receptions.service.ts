import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { DateTime } from "luxon";
import { FilterQuery, Model, PipelineStage, Types } from "mongoose";
import { EventName } from "../../../common/enums";
import { ServiceException } from "../../../common/exceptions";
import { ConfigService } from "../../../config";
import { ServicesService } from "../../services/services";
import { CreateReceptionDto, UpdateReceptionDto, GetAllReceptionsDto, ReceptionsCountDto } from "../dto";
import { ReceptionStatus } from "../enums";
import { ReceptionDocument, ReceptionEntity } from "../schemas";

@Injectable()
export class ReceptionsService {

  constructor(
    @InjectModel(ReceptionEntity.name)
    private readonly receptionModel: Model<ReceptionEntity>,
    private readonly servicesService: ServicesService,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private async verifyDate(date: Date): Promise<void> {
    const receptionExists = !!(await this.receptionModel.exists({ date }));

    if (receptionExists) {
      throw new ServiceException("Reception with specified date and time already exists", "ALERADY_BOOKED", "ALREADY_EXISTS", { date });
    }
  }

  async create(data: CreateReceptionDto, userId: string): Promise<ReceptionDocument> {
    const { serviceIds, date } = data;

    let objectServiceIds: Types.ObjectId[];
    let price = 0;
    if (serviceIds?.length) {
      objectServiceIds = serviceIds.map(item => new Types.ObjectId(item));

      price = await this.servicesService.calculateServicesPrice(objectServiceIds);
    }

    const modifiedDate = DateTime.fromJSDate(date).set({
      hour: date.getHours(),
      minute: 0,
      second: 0,
      millisecond: 0,
    }).toJSDate();

    await this.verifyDate(modifiedDate);

    const result = await this.receptionModel.create({
      ...data,
      date: modifiedDate,
      serviceIds: objectServiceIds,
      price,
    });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "New reception was created" });

    return result;
  }

  private generateAggregationPipelines(params: GetAllReceptionsDto): PipelineStage[] {
    const { filter, sort } = params;

    const aggregationPipelines: PipelineStage[] = [];
    if (filter?.date) {
      const start = DateTime.fromJSDate(filter.date).startOf("day").toISODate();
      const end = DateTime.fromJSDate(filter.date).endOf("day").toISODate();

      aggregationPipelines.push({
        $match: {
          date: { $gte: start, $lte: end },
        },
      });
    }

    if (filter?.departmentId) {
      aggregationPipelines.push(...[{
        $lookup: {
          localField: "doctorId",
          foreignField: "_id",
          from: "users",
          as: "doctor",
        },
      },
        { $match: { "doctor.departmentId": filter.departmentId } },
      ]);
    }

    if (sort) {
      aggregationPipelines.push({
        $sort: sort,
      });
    }

    return aggregationPipelines;
  }

  async getAll(params: GetAllReceptionsDto): Promise<ReceptionDocument[]> {

    const aggregationPipelines = this.generateAggregationPipelines(params);

    return await this.receptionModel
      .aggregate(aggregationPipelines);
  }

  async getFreeDates(pickedDate: Date): Promise<Date[]> {
    const { start: startHour, end: endHour } = this.configService.workHours;

    const startDate = DateTime.fromJSDate(pickedDate).set({
      hour: startHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).toJSDate();

    const endDate = DateTime.fromJSDate(pickedDate).set({
      hour: endHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).toJSDate();

    const foundReceptions = await this.receptionModel.find({ date: { $gte: startDate, $lte: endDate } });

    const existingHours = new Set<number>();
    for await (const foundReception of foundReceptions) {
      const date = foundReception.date;

      existingHours.add(date.getHours());
    }

    const results: Date[] = [];
    for (let hour = startHour; hour < endHour; hour += 1) {
      if (!existingHours.has(hour)) {
        results.push(DateTime.fromJSDate(pickedDate).set({
          hour,
          minute: 0,
          second: 0,
          millisecond: 0,
        }).toJSDate());
      }
    }

    return results;
  }

  async updateById(id: string, data: UpdateReceptionDto, userId: string): Promise<ReceptionDocument> {
    const { serviceIds, date } = data;

    let serviceObjectIds: Types.ObjectId[];
    let price: number;
    if (serviceIds?.length) {
      serviceObjectIds = serviceIds.map(item => new Types.ObjectId(item));

      price = await this.servicesService.calculateServicesPrice(serviceObjectIds);
    }

    let modifiedDate: Date;
    if (date) {
      modifiedDate = DateTime.fromJSDate(date).set({
        hour: date.getHours(),
        minute: 0,
        second: 0,
        millisecond: 0,
      }).toJSDate();

      await this.verifyDate(modifiedDate);
    }

    const result = await this.receptionModel.findByIdAndUpdate(id, {
      ...data,
      date: modifiedDate,
      serviceIds: serviceObjectIds,
      price,
    }, { new: true });


    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Reception was updated" });

    return result;
  }

  async findById(id: string): Promise<ReceptionDocument> {
    return await this.receptionModel.findById(id);
  }

  async findOne(data: FilterQuery<ReceptionEntity>): Promise<ReceptionDocument> {
    return await this.receptionModel.findOne(data);
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const result = await this.receptionModel.deleteOne({ _id: id });

    this.eventEmitter.emit(EventName.EventCreated, { userId, type: "Reception was deleted" });

    return result.deletedCount !== 0;
  }

  async countReceptions(data: ReceptionsCountDto): Promise<number[]> {
    const startDate = DateTime.fromJSDate(data.startDate).startOf("day").toJSDate();
    const endDate = DateTime.fromJSDate(data.endDate).endOf("day").toJSDate();

    const results = await this.receptionModel.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate }, status: ReceptionStatus.Done, doctorId: data.doctorId } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    return results.map(item => item.count);
  }
}