import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateServiceDto, GetAllServicesDto, UpdateServiceDto } from "../dto";
import { ServiceDocument, ServiceEntity } from "../schemas";

import { ServicesService } from "../services";

@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiResponse({ status: 201, type: ServiceEntity })
  async create(@Headers("User-Id") userId: string, @Body() data: CreateServiceDto): Promise<ServiceDocument> {
    return await this.servicesService.create(data, userId);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: ServiceEntity })
  async getServicesById(@Param("id") id: string): Promise<ServiceDocument> {
    return this.servicesService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ServiceEntity] })
  async getServices(@Query() params: GetAllServicesDto): Promise<ServiceDocument[]> {
    return this.servicesService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: ServiceEntity })
  async updateServices(@Headers("User-Id") userId: string, @Param("id") id: string, @Body() data: UpdateServiceDto): Promise<ServiceDocument> {
    return await this.servicesService.updateById(id, data, userId);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Headers("User-Id") userId: string, @Param("id") id: string): Promise<boolean> {
    return await this.servicesService.deleteById(id, userId);
  }
}
