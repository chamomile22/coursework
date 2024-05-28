import { Body, Controller, Delete, Get, Param, Patch, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllUsersDto, UpdateUserDto } from "../dto";
import { UserDocument, UserEntity } from "../schemas";
import { UsersService } from "../services";

@ApiTags("User")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get("/doctors-with-department")
  @ApiResponse({ status: 200, type: [UserEntity] })
  async getDoctorsWithDepartment(@Query() params: GetAllUsersDto): Promise<UserDocument[]> {
    return this.userService.getDoctorsWithDepartment(params);
  }

  @Get(":id")
  @ApiResponse({ status: 200, type: UserEntity })
  async getUser(@Param("id") id: string): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200, type: [UserEntity] })
  async getUsers(@Query() params: GetAllUsersDto): Promise<UserDocument[]> {
    return this.userService.getAll(params);
  }

  @Patch(":id")
  @ApiResponse({ status: 200, type: UserEntity })
  async updateUser(@Param("id") id: string, @Body() data: UpdateUserDto): Promise<UserDocument> {
    return await this.userService.updateById(id, data);
  }

  @Delete(":id")
  @ApiResponse({ status: 200 })
  async deleteById(@Param("id") id: string): Promise<boolean> {
    return await this.userService.deleteById(id);
  }
}
