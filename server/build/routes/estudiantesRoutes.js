"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estudiantesController_1 = require("../controllers/estudiantesController");
const multer_1 = __importDefault(require("../libs/multer"));
class EstudiantesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', estudiantesController_1.list);
        this.router.get('/:id', estudiantesController_1.one);
        this.router.get('/names', estudiantesController_1.names);
        this.router.post('/', multer_1.default.single('image'), estudiantesController_1.create);
        this.router.post('/foto', multer_1.default.single('image'), estudiantesController_1.createPhoto);
        this.router.delete('/:id', estudiantesController_1.deleteStudent);
    }
}
const estudiantesRoutes = new EstudiantesRoutes();
exports.default = estudiantesRoutes.router;
