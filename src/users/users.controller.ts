import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) readonly usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @Post('/')
  async createUser(@Body() user: Prisma.UserCreateInput): Promise<User> {
    console.log(user);
    return await this.usersService.createUser(user);
  }

  @Get('/')
  async getUserById(@Query('id') id): Promise<User | null> {
    try {
      return await this.usersService.user({ id: parseInt(id) });
    } catch (error) {
      return null;
    }
  }
}
