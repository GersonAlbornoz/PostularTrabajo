"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estudiantesController_1 = require("../controllers/estudiantesController");
class EstudiantesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', estudiantesController_1.list);
        this.router.get('/names', estudiantesController_1.names);
        this.router.post('/', estudiantesController_1.create);
        this.router.delete('/:id', estudiantesController_1.deleteStudent);
    }
}
const estudiantesRoutes = new EstudiantesRoutes();
exports.default = estudiantesRoutes.router;
