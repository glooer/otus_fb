import { CreatePostDto } from 'src/user/dto/create-post.dto';
import { Post } from 'src/user/entities/post.entity';

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

import { AuthUser } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepo } from './repo/user.repo';
import { checkPassword, encryptPassword } from './user.util';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

const getUserCacheKey = (userId: number) => `feed:${userId}`;

@Injectable()
export class UserService {

  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) { }

  login(user: User) {
    return {
      token: this.jwtService.sign({
        login: user.email,
        id: user.id
      }),
    };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = encryptPassword(createUserDto.password);
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.age = createUserDto.age;
    user.sex = createUserDto.sex;
    user.interests = createUserDto.interests;
    user.city = createUserDto.city;
    await this.userRepo.create(user);
  }

  async createPost(userId: number, data: CreatePostDto) {
    const post = new Post();
    post.userId = userId;
    post.content = data.content;
    await this.userRepo.createPost(post);
  }

  async getFeedPost(userId: number) {
    const key = getUserCacheKey(userId);
    const cachedData = await this.cacheService.get(key);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.userRepo.getFeedPost(userId);
    await this.cacheService.set(key, data);
    await this.userRepo.setUserLastUpdateFeed(userId);
    return data;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateFeeds() {
    const users = JSON.parse(JSON.stringify(await this.userRepo.getUsersForFeedUpdate()));
    const updateUserData = async ({ user_id: userId }) => {
      const data = await this.userRepo.getFeedPost(userId);
      await this.cacheService.set(getUserCacheKey(userId), data);
      await this.userRepo.setUserLastUpdateFeed(userId);
    };

    await users.forEach(updateUserData);
  }

  async auth(data: AuthUser) {
    const user = await this.userRepo.findByEmail(data.email);

    if (user === null) {
      throw "Not auth";
    }

    if (!checkPassword(data.password, user.password)) {
      throw "Wrong password";
    }

    return user;
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne(id);
  }

  async createFriend(userIdFrom: number, userIdTo: number) {
    return await this.userRepo.createFriend(userIdFrom, userIdTo);
  }

  async friendList(userId: number) {
    return await this.userRepo.friendList(userId);
  }

  async find(firstName: string, lastName: string) {
    return await this.userRepo.find({
      firstName,
      lastName
    });
  }
}
