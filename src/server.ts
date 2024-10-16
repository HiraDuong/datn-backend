/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:00:34
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 13:59:13
 * @ Description: main server file
 */

import dotenv from 'dotenv';
import app from './app';
import database from './config/db.config';
import router from './routes/router.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to database
database
    .initialize()
    .then(() => {
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        app.use('/api/v1', [router]);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
