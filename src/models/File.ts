import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Task } from "./Task";
import { Submit } from "./Submit";

@Table({
    tableName: "files",
})
export class File extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    declare url: string

    @ForeignKey(() => Submit)
    @Column({
        type: DataType.INTEGER
    })
    submitId: number

}