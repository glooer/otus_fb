import { DbService } from "src/db/db.service";
import { Post } from "src/user/entities/post.entity";
import { plainToInstanceKeysMap } from "src/utils";

import { Injectable } from "@nestjs/common";

import { User } from "../entities/user.entity";

const getOneUser = (rows: any) =>
  plainToInstanceKeysMap(User, rows[0]) || null;

@Injectable()
export class UserRepo {

  constructor(private readonly dbService: DbService) { }

  async create(user: User) {
    const sql = "insert into t_users(email, password, first_name, last_name, age, sex, interests, city) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const data = [
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.age,
      user.sex,
      user.interests,
      user.city,
    ];

    await this.dbService.getPool().query(sql, data);
  }

  async findByEmail(email: string) {
    const [rows] = await this.dbService.getPool().query("select * from t_users where email = ?", [email]);

    if ((rows as any).length > 1) {
      throw "To many results";
    }

    return getOneUser(rows);
  }

  async findAll() {
    const [rows] = await this.dbService.getPool().query("select * from t_users");
    return plainToInstanceKeysMap(User, (rows as any[]));
  }

  async findOne(id: number) {
    const [rows] = await this.dbService.getPool().query("select * from t_users where id = ?", [id]);
    return getOneUser(rows);
  }

  async createFriend(userIdFrom: number, userIdTo: number) {
    await this.dbService.getPool().query("insert into t_friends(user_id, friend_id) values (?, ?)", [userIdFrom, userIdTo]);
  }

  async friendList(userId: number) {
    const [rows] = await this.dbService.getPool().query("select t.* from t_users t join t_friends f on t.id = f.friend_id where f.user_id = ?", [userId]);
    return plainToInstanceKeysMap(User, (rows as any[]));
  }

  async find({ firstName, lastName }) {
    const [rows] = await this.dbService.getPool().query("select u.* from t_users u where u.last_name like concat(?, '%') and u.first_name like concat(?, '%')", [lastName, firstName]);
    return plainToInstanceKeysMap(User, (rows as any[]));
  }

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