/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-09 01:19:35
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-12 23:51:34
 * @ Description: Cấu hình kết nối cơ sở dữ liệu
 */

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import mongoose from 'mongoose';

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;
  // Phương thức khởi tạo để gọi kết nối PostgreSQL và MongoDB
  public async initialize() {
    await this.connectMongoDB();
    await this.connectPostgreSQL();
  }

  // Kết nối với PostgreSQL
  private async connectPostgreSQL() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [__dirname + '/models/postgresql/*.ts'],
    });

    try {
      await this.sequelize.authenticate();
      console.log('Connected to PostgreSQL');
    } catch (error) {
      console.error('PostgreSQL connection error:', error);
      process.exit(1);
    }
  }

  // Kết nối với MongoDB
  private async connectMongoDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI ?? '');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

const database = new Database();
export default database;
