import { ChatRepo } from 'src/chat/chat.repo';
import { CreateMessageDto } from 'src/chat/dto/create-post.dto';
import { Message } from 'src/chat/entities/message.entity';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {

  constructor(
    private readonly chatRepo: ChatRepo,
  ) { }

  async createMessage(fromUserId: number, data: CreateMessageDto) {
    const message = new Message();
    message.userFromId = fromUserId;
    message.userToId = data.userToId;
    message.message = data.message;

    await this.chatRepo.save(message);
  }

  getMessages(user1: number, user2: number) {
    return this.chatRepo.getMessages(user1, user2);
  }

}