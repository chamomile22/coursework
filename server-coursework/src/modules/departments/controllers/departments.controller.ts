import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateDepartmentDto, GetAllDepartmentsDto, UpdateDepartmentDto } from "../dto";
import { DepartmentDocument, DepartmentEntity } from "../schemas";
import { DepartmentsService } from "../services";

@ApiTags("Department")
@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiResponse({ status: 201, type: DepartmentEntity })
  async create(@Body() data: CreateDepartmentDto): Promise<DepartmentDocument> {
    return await this.departmentsService.create(data);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: DepartmentEntity })
  async getDepartment(@Param("id") id: string): Promise<DepartmentDocument> {
    return this.departmentsService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [DepartmentEntity] })
  async getDepartments(@Query() params: GetAllDepartmentsDto): Promise<DepartmentDocument[]> {
    return this.departmentsService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: DepartmentEntity })
  async updateDepartment(@Param("id") id: string, @Body() data: UpdateDepartmentDto): Promise<DepartmentDocument> {
    return await this.departmentsService.updateById(id, data);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Param("id") id: string): Promise<boolean> {
    return await this.departmentsService.deleteById(id);
  }
}
