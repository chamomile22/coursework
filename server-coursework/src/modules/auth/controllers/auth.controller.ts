import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserDocument, UserEntity } from "../../users/schemas";
import { ChangePasswordDto, LoginUserBody, RegisterDto } from "../dto";
import { AuthService } from "../services";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("/register")
  @ApiResponse({ status: 200 })
  async register(@Body() body: RegisterDto): Promise<UserDocument> {
    return await this.authService.create(body);
  }

  @Post("/login")
  @ApiResponse({ status: 201 })
  async loginUser(@Body() body: LoginUserBody): Promise<UserDocument> {
    return await this.authService.login({ ...body });
  }

  @Patch("/change-password/:id")
  @ApiResponse({status: 200, type: UserEntity})
  async changePassword(@Param("id") id: string, @Body() data: ChangePasswordDto) : Promise<UserDocument> {
    return await this.authService.changePassword(id, data);
  }
}
