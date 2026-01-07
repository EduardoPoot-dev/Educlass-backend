import { BelongsToMany, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Course } from "./Course";
import { CourseUser } from "./CourseUser";
import { Task } from "./Task";
import { TaskUser } from "./TaskUser";
import { Submit } from "./Submit";

@Table({
    tableName: 'users'
})
export class User extends Model {
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string



    @HasMany(() => Course, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare createdCourses: Course[]



    @HasMany(() => Task, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare createdTask: Task[]

    @HasMany(() => Submit, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare submits: Submit[]
    



    @BelongsToMany(() => Course, () => CourseUser)
    declare enrolledCourses: Course[]



    @BelongsToMany(() => Task, () => TaskUser)
    declare tasksToSend: Course[]
}