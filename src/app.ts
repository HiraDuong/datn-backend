/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-09 01:05:37
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 13:55:49
 * @ Description:
 */

/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-09 01:05:37
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-13 00:01:07
 * @ Description: Cấu hình server
 */

import express from 'express';
import cors from 'cors';
import router from './routes/router.routes';

const app = express();

app.use(express.json());
app.use(cors()); // config cors settings
app.use('api/v1', [router]);

export default app;
