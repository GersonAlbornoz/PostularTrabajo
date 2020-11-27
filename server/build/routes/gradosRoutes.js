"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gradosController_1 = require("../controllers/gradosController");
class GradosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', gradosController_1.list);
    }
}
const gradosRoutes = new GradosRoutes();
exports.default = gradosRoutes.router;
