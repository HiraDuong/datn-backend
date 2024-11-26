

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import mongoose from 'mongoose';

dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;
    // Phương thức khởi tạo để gọi kết nối PostgreSQL và MongoDB
    public async initialize() {
        // await this.connectMongoDB();
        await this.connectPostgreSQL();
    }

    // Kết nối với PostgreSQL
    private async connectPostgreSQL() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,   // Host của database
            port: Number(process.env.POSTGRES_PORT), // Port của database
            username: process.env.POSTGRES_USER,  // Username để kết nối
            password: process.env.POSTGRES_PASSWORD,  // Password để kết nối
            database: process.env.POSTGRES_DB,  // Tên database
            models: [__dirname + '/../models/postgresql/**/*.model.ts'],
            dialectOptions: {
                ssl: {
                    require: true, // Yêu cầu SSL
                    rejectUnauthorized: false, // Nếu cần xác thực certificate, có thể cấu hình
                },
                dialectModule: require('pg')

            },
        });

        try {
            await this.sequelize.authenticate();
            console.log('Connected to PostgreSQL');
            // Đồng bộ hóa các model với cơ sở dữ liệu
            //  await this.sequelize.sync({ alter: true });
             console.log('All models were synchronized successfully.');
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
