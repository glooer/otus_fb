import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { CreateMessageDto } from 'src/chat/dto/create-post.dto';
import { WithAuth } from 'src/user/jwt/jwt.auth.guard';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService
  ) { }

  @Post("create")
  @WithAuth()
  postCreate(
    @Request() req: any,
    @Body() data: CreateMessageDto,
  ) {
    return this.chatService.createMessage(req.user.id, data);
  }

  @Get("/:companionId")
  @WithAuth()
  getMessages(
    @Request() req: any,
    @Param('companionId') companionId: number
  ) {
    return this.chatService.getMessages(req.user.id, companionId);
  }
}
