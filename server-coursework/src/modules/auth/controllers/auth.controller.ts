import { Body, Controller, Headers, Param, Patch, Post } from "@nestjs/common";
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
  async register(@Headers("User-Id") userId: string, @Body() body: RegisterDto): Promise<UserDocument> {
    return await this.authService.create(body, userId);
  }

  @Post("/login")
  @ApiResponse({ status: 201 })
  async loginUser(@Body() body: LoginUserBody): Promise<UserDocument> {
    return await this.authService.login({ ...body });
  }

  @Patch("/change-password/:id")
  @ApiResponse({status: 200, type: UserEntity})
  async changePassword(@Headers("User-Id") userId: string, @Param("id") id: string, @Body() data: ChangePasswordDto) : Promise<UserDocument> {
    return await this.authService.changePassword(id, data, userId);
  }
}
