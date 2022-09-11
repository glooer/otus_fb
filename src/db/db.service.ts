import { Injectable } from "@nestjs/common";
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DbService {
  pool: Pool

  constructor() {
    this.pool = createPool({ 
      host: 'localhost', 
      user: 'root', 
      password: 'root',
      database: 'test', 
    });
  }

  getPool() {
    return this.pool;
  }

}