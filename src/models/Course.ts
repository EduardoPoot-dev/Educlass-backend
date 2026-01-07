import { BelongsToMany, Column, IsUUID, DataType, Default, Model, PrimaryKey, Sequelize, Table, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { CourseUser } from "./CourseUser";
import { Task } from "./Task";
import { Submit } from "./Submit";

@Table({
    tableName: 'courses'
})
export class Course extends Model {
    
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare id: string;
    
    @Column({
        type: DataType.STRING(30)
    })
    declare name: string

    @Column({
        type: DataType.STRING(10)
    })
    declare grade: string

    @Column({
        type: DataType.STRING(10)
    })
    declare group: string

  
    @Column({
        type: DataType.STRING(100)
    })
    declare password: string

    @Column({
        type: DataType.STRING(150)
    })
    declare background: string



    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    declare creatorId: number

    @BelongsTo(() => User)
    declare creator: User



    @HasMany(() => Task, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare tasks: Task[]



    @BelongsToMany(() => User, () => CourseUser)
    declare users: User[]



    @HasMany(() => Submit, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare submits: Submit[]
    


}