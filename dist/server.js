"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const coursesRoutes_1 = __importDefault(require("./routes/coursesRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const submitRoutes_1 = __importDefault(require("./routes/submitRoutes"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const connectDb = async () => {
    try {
        await db_1.db.authenticate();
        db_1.db.sync();
        console.log('DB is connceted');
    }
    catch (error) {
        console.log(error);
    }
};
connectDb();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/course', coursesRoutes_1.default);
app.use('/api/tasks', tasksRoutes_1.default);
app.use('/api/submit', submitRoutes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map