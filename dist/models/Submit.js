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
exports.Submit = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Task_1 = require("./Task");
const File_1 = require("./File");
const User_1 = require("./User");
const Course_1 = require("./Course");
let Submit = class Submit extends sequelize_typescript_1.Model {
    taskId;
    userId;
    files;
    courseId;
};
exports.Submit = Submit;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Task_1.Task),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID
    }),
    __metadata("design:type", String)
], Submit.prototype, "taskId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], Submit.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Submit.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => File_1.File),
    __metadata("design:type", Array)
], Submit.prototype, "files", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Course_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID
    }),
    __metadata("design:type", String)
], Submit.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Course_1.Course),
    __metadata("design:type", Course_1.Course)
], Submit.prototype, "course", void 0);
exports.Submit = Submit = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'submits'
    })
], Submit);
//# sourceMappingURL=Submit.js.map