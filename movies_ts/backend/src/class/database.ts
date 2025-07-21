import { IDatabase } from '../interface/IDatabase';
import mysql2 from 'mysql2/promise';

export class Database implements IDatabase {
  private connection: mysql2.Connection | null = null;

  constructor(
    public host: string,
    public database: string,
    public user: string,
    public password: string,
  ) {}

  async connect(): Promise<void> {
    if (this.connection) {
      console.log('Already connected');
      return;
    }

    this.connection = await mysql2.createConnection({
      host: this.host,
      database: this.database,
      user: this.user,
      password: this.password,
    });
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error('Not connected to database');
    }

    return this.connection.execute(sql, params);
  }
}
