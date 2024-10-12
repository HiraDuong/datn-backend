/**
 * @ Author: Vu Huy Hoang
 * @ Create Time: 2024-10-10 01:47:43
 * @ Modified by: Vu Huy Hoang
 * @ Modified time: 2024-10-10 02:43:58
 * @ Description:
 */


import { Column, DataType, Table, Model } from "sequelize-typescript";
import { UserRole } from "../../types/user.type";

@Table({
    tableName: "users",
})

export default class Users extends Model<Users> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "users_id"
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        field: "users_username",
    })
    username!: string;
    
    @Column({
        type: DataType.STRING(100),
        field: "users_email",
    })
    email!: string;

    @Column({
        type: DataType.STRING(100),
        field: "users_password",
    })
    password!: string;

    @Column({
        type: DataType.STRING(100),
        field: "users_salt",
    })
    salt!: string;

    @Column({
        type: DataType.ENUM('admin','user'),
        field: "users_role"
    })
    role!: UserRole
}