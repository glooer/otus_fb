import { Post } from "src/posts/entities/post.entity";
import { UserService } from "src/user/user.service";
import { WsStore } from "src/ws/ws.store";

import { Injectable } from "@nestjs/common";

@Injectable()
export class WsService {
  readonly store: WsStore = new WsStore();

  constructor(
    private readonly userService: UserService,
  ) { }

  getStore() {
    return this.store;
  }

  getUserByJwt(token: string): number {
    return this.userService.getUserIdByJwt(token);
  }

  private broadcastToUsers(users: number[], event, message: any) {
    const broadCastMessage = JSON.stringify({
      event,
      data: message
    });

    const clients = this.store.getClients();
    for (let userId in clients) {
      if (users.includes(+userId)) {
        clients[userId].send(broadCastMessage);
      }
    }
  }

  onCreatedPost(post: Post, users: number[]) {
    this.broadcastToUsers(users, 'newPost', post);
  }

}