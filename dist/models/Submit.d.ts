import { Model } from "sequelize-typescript";
import { File } from "./File";
import { User } from "./User";
import { Course } from "./Course";
export declare class Submit extends Model {
    taskId: string;
    userId: number;
    user: User;
    files: File[];
    courseId: string;
    course: Course;
}
