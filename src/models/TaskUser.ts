import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Course } from "./Course";
import { User } from "./User";
import { Task } from "./Task";


@Table({
    tableName: 'taskUsers'
})
export class TaskUser extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @ForeignKey(() => Task)
    @Column({
        type: DataType.UUID
    })
    taskId: number;
} 