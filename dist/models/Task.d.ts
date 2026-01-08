import { Model } from "sequelize-typescript";
import { User } from "./User";
import { Course } from "./Course";
import { Submit } from "./Submit";
export declare class Task extends Model {
    id: string;
    name: string;
    description: string;
    dueDate: Date;
    courseId: string;
    course: Course;
    creatorId: string;
    creator: User;
    users: User[];
    submits: Submit[];
}
