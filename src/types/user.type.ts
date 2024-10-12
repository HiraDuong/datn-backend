/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 01:49:20
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 02:35:27
 * @ Description:
 */

export type UserRole = 'admin' | 'user';
export interface UserSearchTerm {
    username: string | null;
    email: string | null;
    role: UserRole | null;
}
