import { DbService } from "src/db/db.service";
import { Post } from "src/posts/entities/post.entity";

import { Injectable } from "@nestjs/common";

@Injectable()
export class PostRepo {

  constructor(private readonly dbService: DbService) { }

  async createPost(post: Post) {
    const sql = "insert into t_post(user_id, content, date_create) values (?, ?, ?)";
    const data = [
      post.userId,
      post.content,
      new Date()
    ];

    await this.dbService.getPool().query(sql, data);
  }

  async getFeedPost(userId: number) {
    const sql = `
select post.id, post.user_id, post.content, post.date_create
  from t_post post
  join t_friends fr on fr.friend_id = post.user_id
 where fr.user_id = ?
 limit 1000
    `;
    const [rows] = await this.dbService.getPool().query(sql, [userId]);
    return rows;
  }

  async getUsersForFeedUpdate() {
    const sql = `
select fr.user_id
  from t_post post
  join      t_friends fr on fr.friend_id = post.user_id
  left join t_users_feed_update ufu on fr.user_id = ufu.user_id
 where post.date_create > ufu.date_update
    or ufu.date_update is null
 group by fr.user_id
 limit 25    
    `;
    const [rows] = await this.dbService.getPool().query(sql);
    return rows;
  }

  async setUserLastUpdateFeed(userId: number) {
    const pool = this.dbService.getPool();

    await pool.query("delete from t_users_feed_update where user_id = ?", [userId]);
    await pool.query("insert into t_users_feed_update(user_id, date_update) values (?, ?)", [userId, new Date()]);
  }
}