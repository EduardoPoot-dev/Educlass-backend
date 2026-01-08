"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: function (origin, callback) {
        const blackList = [process.env.FRONTEND_URL];
        console.log(origin, blackList);
        if (process.argv[2] === '--api') {
            blackList.push(undefined);
        }
        if (blackList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de cors'));
        }
    }
};
//# sourceMappingURL=cors.js.map