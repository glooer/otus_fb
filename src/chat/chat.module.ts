import { ChatRepo } from 'src/chat/chat.repo';
import { ChatService } from 'src/chat/chat.service';
import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';

@Module({
  imports: [
    DbModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepo]
})
export class ChatModule { }
