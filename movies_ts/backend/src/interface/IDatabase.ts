export interface IDatabase {
  host: string;
  user: string;
  password: string;
  database: string;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
