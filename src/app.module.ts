import * as redisStore from 'cache-manager-redis-store';
import { ChatModule } from 'src/chat/chat.module';
import { PostModule } from 'src/posts/post.module';

import { CacheModule, Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 0
    }),
    UserModule,
    PostModule,
    ChatModule,
  ],
})
export class AppModule { }
