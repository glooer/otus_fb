import { UserModule } from 'src/user/user.module';
import { WsService } from 'src/ws/ws.service';

import { Module } from '@nestjs/common';

import { WsGateway } from './Ws.gateway';

@Module({
  imports: [
    UserModule
  ],
  providers: [WsService, WsGateway],
  exports: [WsService],
})
export class WsModule { }