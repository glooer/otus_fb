import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { WsService } from 'src/ws/ws.service';

@Controller()
export class RabbitMQController {

  constructor(
    private readonly wsService: WsService,
  ) { }

  @MessagePattern('newPost')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.wsService.onCreatedPost(data.post, data.users);
    channel.ack(originalMsg);
  }
}