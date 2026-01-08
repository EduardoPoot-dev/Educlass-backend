"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Course_1 = require("./Course");
const CourseUser_1 = require("./CourseUser");
const Task_1 = require("./Task");
const TaskUser_1 = require("./TaskUser");
const Submit_1 = require("./Submit");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50)
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Unique)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50)
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Course_1.Course, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "createdCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Task_1.Task, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "createdTask", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Submit_1.Submit, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "submits", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Course_1.Course, () => CourseUser_1.CourseUser),
    __metadata("design:type", Array)
], User.prototype, "enrolledCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Task_1.Task, () => TaskUser_1.TaskUser),
    __metadata("design:type", Array)
], User.prototype, "tasksToSend", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users'
    })
], User);
//# sourceMappingURL=User.js.map