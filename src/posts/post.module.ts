import { DbModule } from 'src/db/db.module';
import { PostRepo } from "src/posts/post.repo";
import { PostService } from "src/posts/post.service";

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PostController } from './post.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DbModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepo]
})
export class PostModule { }
