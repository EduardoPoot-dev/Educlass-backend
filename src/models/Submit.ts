import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "./Task";
import { File } from "./File";
import { User } from "./User";
import { Course } from "./Course";

@Table({
    tableName: 'submits'
})
export class Submit extends Model {

    @ForeignKey(() => Task)
    @Column({
        type: DataType.UUID
    })
    taskId: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number
    
    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => File)
    files: File[];


    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID
    })
    courseId: string

    @BelongsTo(() => Course)
    declare course: Course


}