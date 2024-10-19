/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-13 00:04:45
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-19 19:53:45
 * @ Description: Base routes
 */

import { Router } from 'express';
import IRouter from './interface.routes';
abstract class BaseRoutes implements IRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    abstract routes(): void;
}

export default BaseRoutes;
