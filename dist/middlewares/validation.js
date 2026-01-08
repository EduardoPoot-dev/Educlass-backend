"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = handleInputErrors;
const express_validator_1 = require("express-validator");
function handleInputErrors(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(500).json({ errors: result.array() });
        return;
    }
    next();
}
//# sourceMappingURL=validation.js.map