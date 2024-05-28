import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEquipmentDto, GetAllEquipmentDto, UpdateEquipmentDto } from "../dto";
import { EquipmentDocument, EquipmentEntity } from "../schemas";
import { EquipmentService } from "../services";

@ApiTags("Equipment")
@Controller("equipment")
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @ApiResponse({ status: 201, type: EquipmentEntity })
  async create(@Body() data: CreateEquipmentDto): Promise<EquipmentDocument> {
    return await this.equipmentService.create(data);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: EquipmentEntity })
  async getEquipmentById(@Param("id") id: string): Promise<EquipmentDocument> {
    return this.equipmentService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [EquipmentEntity] })
  async getEquipment(@Query() params: GetAllEquipmentDto): Promise<EquipmentDocument[]> {
    return this.equipmentService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: EquipmentEntity })
  async updateEquipment(@Param("id") id: string, @Body() data: UpdateEquipmentDto): Promise<EquipmentDocument> {
    return await this.equipmentService.updateById(id, data);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Param("id") id: string): Promise<boolean> {
    return await this.equipmentService.deleteById(id);
  }
}
