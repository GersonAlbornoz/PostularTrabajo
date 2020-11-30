"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const estudiantesRoutes_1 = __importDefault(require("./routes/estudiantesRoutes"));
const gradosRoutes_1 = __importDefault(require("./routes/gradosRoutes"));
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/students', estudiantesRoutes_1.default);
        this.app.use('/api/grados', gradosRoutes_1.default);
        this.app.use('/api/pagos', pagosRoutes_1.default);
        this.app.use('uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
