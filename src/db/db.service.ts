import { Pool, createPool } from 'mysql2/promise';

import { Injectable } from "@nestjs/common";

@Injectable()
export class DbService {
  pool: Pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: '123',
      database: 'test',
    });
  }

  getPool() {
    return this.pool;
  }
}