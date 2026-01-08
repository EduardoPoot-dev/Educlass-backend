import { Model } from "sequelize-typescript";
import { User } from "./User";
import { Task } from "./Task";
import { Submit } from "./Submit";
export declare class Course extends Model {
    id: string;
    name: string;
    grade: string;
    group: string;
    password: string;
    background: string;
    creatorId: number;
    creator: User;
    tasks: Task[];
    users: User[];
    submits: Submit[];
}
