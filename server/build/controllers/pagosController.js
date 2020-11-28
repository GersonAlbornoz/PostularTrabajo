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
exports.mes = exports.list = exports.pagar = exports.insertar = void 0;
const database_1 = __importDefault(require("../database"));
exports.insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query('select matricular1();select matricular2();select matricular3();');
        return res.json({
            message: 'Movimientos insertados'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.pagar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.default.query('update movimiento set estado=$1 where id_movimiento=$2;', ['PAGADO', id]);
        return res.json({
            message: 'Movimientos insertados'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.default.query('SELECT M.id_movimiento,M.monto,M.estado, mes(M.id_detalle_cronograma),false as checked,M.estado!=$1 and M.estado!=$2  as notdisabled FROM movimiento M,detalle_cronograma D where M.id_detalle_cronograma=D.id_detalle_cronograma and id_persona = $3 order by D.fecha_venci', ['PAGADO', 'ANULADO', id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.mes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.default.query('SELECT mes($1)', [id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
