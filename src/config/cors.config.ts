/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-09 01:19:41
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 01:47:12
 * @ Description: Cấu hình cors
 */

import cors from 'cors';

export const corsOptions = {
  origin: '*', // default origin is all
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export default cors(corsOptions);
