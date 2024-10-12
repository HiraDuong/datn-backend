/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-09 01:05:37
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-09 01:29:54
 * @ Description: Main của chương trình
 */

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
