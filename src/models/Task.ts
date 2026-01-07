import { Model, PrimaryKey, Default, DataType, Column, AllowNull, BelongsToMany, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./User";
import { Course } from "./Course";
import { TaskUser } from "./TaskUser";
import { File } from "./File";
import { Submit } from "./Submit";

@Table({
    tableName: 'tasks'
})
export class Task extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare id: string;

    @Column({
        type: DataType.STRING(50)
    })
    declare name: string;

    @Column({
        type: DataType.STRING(50)
    })
    declare description: string;

    @Column({
        type: DataType.DATE()
    })
    declare dueDate: Date;



    @ForeignKey(() => Course)
    @Column({
        type: DataType.UUID
    })
    declare courseId: string;

    @BelongsTo(() => Course)
    declare course: Course;
    

    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare creatorId: string;

    @BelongsTo(() => User)
    declare creator: User;



    @BelongsToMany(() => User, () => TaskUser)
    declare users: User[];


    @HasMany(() => Submit)
    declare submits: Submit[];


 
}