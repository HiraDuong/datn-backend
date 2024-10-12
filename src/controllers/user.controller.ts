/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 02:15:15
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 02:44:47
 * @ Description:
 */

import UserService from "../services/user.service";

class UserController {
    private userService: UserService
    constructor() {
        this.userService = new UserService();
    }
    
    async createUser(req: any, res: any) {
        try {
           
        } catch (error) {
            
        }
    }
    
}