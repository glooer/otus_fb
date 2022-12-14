export class WsStore {
  readonly store = {};

  addClient(userId: number, client: any) {
    this.store[userId] = client;
  }

  removeClient(client: any) {
    const userId = this.findUserId(client);
    if (userId) {
      delete this.store[userId];
    }
  }

  findUserId(client: any) {
    for (let key in this.store) {
      if (this.store[key] === client) {
        return key;
      }
    }

    return null;
  }

  getClients(): any {
    return this.store;
  }
}