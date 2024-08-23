import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateReceptionDto, GetAllReceptionsDto, GetFreeReceptionsDto, UpdateReceptionDto } from "../dto";
import { ReceptionDocument, ReceptionEntity } from "../schemas";
import { ReceptionsService } from "../services";

@ApiTags("Receptions")
@Controller("receptions")
export class ReceptionsController {
  constructor(private readonly receptionsService: ReceptionsService) {}

  @Post()
  @ApiResponse({ status: 201, type: ReceptionEntity })
  async create(@Headers("User-Id") userId: string, @Body() data: CreateReceptionDto): Promise<ReceptionEntity> {
    return await this.receptionsService.create(data, userId);
  }

  @Get("/free")
  @ApiResponse({ status: 200, type: [Date] })
  async getFreeReceptions(@Query() params: GetFreeReceptionsDto): Promise<Date[]> {
    return this.receptionsService.getFreeDates(params.date);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: ReceptionEntity })
  async getReception(@Param("id") id: string): Promise<ReceptionDocument> {
    return this.receptionsService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ReceptionEntity] })
  async getReceptions(@Query() params: GetAllReceptionsDto): Promise<ReceptionDocument[]> {
    return this.receptionsService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: ReceptionEntity })
  async updateReception(@Headers("User-Id") userId: string, @Param("id") id: string, @Body() data: UpdateReceptionDto): Promise<ReceptionDocument> {
    return await this.receptionsService.updateById(id, data, userId);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Headers("User-Id") userId: string, @Param("id") id: string): Promise<boolean> {
    return await this.receptionsService.deleteById(id, userId);
  }
}
