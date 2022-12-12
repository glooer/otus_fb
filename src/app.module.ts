import * as redisStore from 'cache-manager-redis-store';

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
    UserModule
  ],
})
export class AppModule { }
