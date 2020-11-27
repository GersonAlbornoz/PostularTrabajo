"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.create = exports.names = exports.list = void 0;
const database_1 = __importDefault(require("../database"));
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query('SELECT P.nid_persona,P.nom_persona,P.ape_pate_pers,P.ape_mate_pers,P.fecha_naci,P.foto_ruta,G.nivel,G.desc_grado FROM persona P, grado G where P.nid_grado=G.nid_grado order by P.nid_persona');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.names = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query('SELECT nom_persona FROM persona order by nom_persona');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname1, lname2, grado, nace, foto } = req.body;
        const response = yield database_1.default.query('INSERT INTO persona VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)', [fname, lname1, lname2, grado, nace, foto]);
        return res.json({
            message: 'Estudiante Guardado'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.default.query('DELETE FROM persona WHERE nid_persona = $1', [id]);
        return res.status(200).json('Estudiante #' + id + ' eliminado satisfactoriamente');
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
