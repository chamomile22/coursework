import { ServiceException } from "@module/common/exceptions";
import { Injectable } from "@nestjs/common";

import { UserDocument } from "../../users/schemas";
import { UsersService } from "../../users/services";
import { ChangePasswordDto, LoginUserBody, RegisterDto } from "../dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async create(data: RegisterDto): Promise<UserDocument> {
    const { email, phone } = data;
    const userWithPassword = await this.usersService.findOne({ $or: [{ email }, { phone }] });

    if (userWithPassword && userWithPassword.email === email) {
      throw new ServiceException("User with this email is already created", "ALREADY_EXISTS", "VALIDATION");
    }

    if (userWithPassword && userWithPassword.phone === phone) {
      throw new ServiceException("User with this phone is already created", "ALREADY_EXISTS", "VALIDATION");
    }

    return await this.usersService.create(data);
  }

  async login(data: LoginUserBody): Promise<UserDocument> {
    const userWithPassword = await this.usersService.findOneWithPassword(data);

    if (!userWithPassword) {
      throw new ServiceException("Password or email is incorrect", "INCORRECT_PASSWORD_OR_EMAIL", "VALIDATION");
    }

    return await this.usersService.findById(userWithPassword.id);
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<UserDocument> {
    const { password, newPassword } = data;
    const userWithPassword = await this.usersService.findOneWithPassword({ _id: id, password });

    if (!userWithPassword) {
      throw new ServiceException("Password or email is incorrect", "INCORRECT_PASSWORD_OR_EMAIL", "VALIDATION");
    }

    return await this.usersService.updateById(id, { password: newPassword });
  }
}
