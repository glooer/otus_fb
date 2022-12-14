import { WsService } from 'src/ws/ws.service';
import { Server } from 'ws';

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8086)
export class WsGateway {
  @WebSocketServer()
  readonly server: Server;

  constructor(
    private readonly wsService: WsService,
  ) { }

  handleDisconnect(client: any) {
    this.wsService.store.removeClient(client);
  }

  @SubscribeMessage('auth')
  authClient(client: any, data: any) {
    const jwtToken = data;

    const userId = this.wsService.getUserByJwt(jwtToken);
    if (userId) {
      this.wsService.store.addClient(userId, client);
      return {
        event: 'success'
      };
    }

    return {
      event: 'error'
    };
  }
}