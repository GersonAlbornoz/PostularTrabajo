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
        this.router.get('/:id', pagosController_1.list);
        this.router.get('/mes/:id', pagosController_1.mes);
        this.router.get('/pagar/:id', pagosController_1.pagar);
        this.router.get('/anular/:id', pagosController_1.anular);
    }
}
const gradosRoutes = new GradosRoutes();
exports.default = gradosRoutes.router;
