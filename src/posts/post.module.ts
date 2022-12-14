import { DbModule } from 'src/db/db.module';
import { PostRepo } from "src/posts/post.repo";
import { PostService } from "src/posts/post.service";
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { UserModule } from 'src/user/user.module';
import { WsModule } from 'src/ws/ws.module';

import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PostController } from './post.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DbModule,
    WsModule,
    UserModule,
    RabbitMQModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepo]
})
export class PostModule { }
