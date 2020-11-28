"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagosController_1 = require("../controllers/pagosController");
class GradosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/insertar', pagosController_1.insertar);
    }
}
const gradosRoutes = new GradosRoutes();
exports.default = gradosRoutes.router;
