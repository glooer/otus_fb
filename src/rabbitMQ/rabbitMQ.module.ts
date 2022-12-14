import { rabbitMQOptions } from 'src/app.settings';
import { RabbitMQController } from 'src/rabbitMQ/rabbitMQ.controller';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { WsModule } from 'src/ws/ws.module';

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [
            rabbitMQOptions.url,
          ],
          queue: rabbitMQOptions.queue,
        },
      },
    ]),
    WsModule,
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule { }