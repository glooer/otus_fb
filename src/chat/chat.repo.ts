import { Message } from "src/chat/entities/message.entity";
import { DbService } from "src/db/db.service";
import { plainToInstanceKeysMap } from "src/utils";

import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatRepo {

  constructor(private readonly dbService: DbService) { }

  async save(message: Message) {
    const sql = "insert into t_message(from_user_id, to_user_id, message, date_create) values (?, ?, ?, ?)";
    const data = [
      message.userFromId,
      message.userToId,
      message.message,
      new Date(),
    ];

    await this.dbService.getPool().query(sql, data);
  }

  async getMessages(userId1: number, userId2: number) {
    const sql = `
select *
  from t_message msg
 where (msg.from_user_id = ? and msg.to_user_id = ?)
    or (msg.to_user_id = ? and msg.from_user_id = ?)
 order by msg.id
    `;

    const [rows] = await this.dbService.getPool().query(sql, [userId1, userId2, userId1, userId2]);
    return plainToInstanceKeysMap(Message, (rows as any[]));
  }
}