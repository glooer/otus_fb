import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from './dto/auth-user.dto';
import { UserDto } from './dto/user.dto';
import { plainToInstanceKeysMap } from 'src/utils';
import { WithAuth } from './jwt/jwt.auth.guard';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("signin")
  async signin(@Body() data: AuthUser) {
    return this.userService.login(await this.userService.auth(data));
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    const data = await this.userService.findAll();

    return plainToInstanceKeysMap(UserDto, data);
  }

  @Post("makeFriend/:friendId")
  @WithAuth()
  makeFriend(
    @Request() req: any,
    @Param('friendId') friendId: number
  ) {
    return this.userService.createFriend(req.user.id, friendId)
  }

  @Get("firendList")
  @WithAuth()
  async firendList(@Request() req: any) {
    return plainToInstanceKeysMap(UserDto, await this.userService.friendList(req.user.id));
  }

}
