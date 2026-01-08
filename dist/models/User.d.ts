import { Model } from "sequelize-typescript";
import { Course } from "./Course";
import { Task } from "./Task";
import { Submit } from "./Submit";
export declare class User extends Model {
    name: string;
    email: string;
    password: string;
    createdCourses: Course[];
    createdTask: Task[];
    submits: Submit[];
    enrolledCourses: Course[];
    tasksToSend: Course[];
}
