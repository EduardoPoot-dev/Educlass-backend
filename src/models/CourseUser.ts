import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Course } from "./Course";



@Table({
    tableName: 'courseUsers'
})
export class CourseUser extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID
    })
    courseId: string
}