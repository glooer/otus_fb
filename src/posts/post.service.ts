import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/entities/post.entity';

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostRepo } from 'src/posts/post.repo';

const getUserCacheKey = (userId: number) => `feed:${userId}`;

@Injectable()
export class PostService {

  constructor(
    private readonly postRepo: PostRepo,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) { }

  async createPost(userId: number, data: CreatePostDto) {
    const post = new Post();
    post.userId = userId;
    post.content = data.content;
    await this.postRepo.createPost(post);
  }

  async getFeedPost(userId: number) {
    const key = getUserCacheKey(userId);
    const cachedData = await this.cacheService.get(key);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.postRepo.getFeedPost(userId);
    await this.cacheService.set(key, data);
    await this.postRepo.setUserLastUpdateFeed(userId);
    return data;
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateFeeds() {
    const users = JSON.parse(JSON.stringify(await this.postRepo.getUsersForFeedUpdate()));
    const updateUserData = async ({ user_id: userId }) => {
      const data = await this.postRepo.getFeedPost(userId);
      await this.cacheService.set(getUserCacheKey(userId), data);
      await this.postRepo.setUserLastUpdateFeed(userId);
    };

    await users.forEach(updateUserData);
  }

}