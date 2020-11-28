import {Router} from 'express';
import {insertar} from '../controllers/pagosController'

class GradosRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/insertar',insertar);
    }
}

const gradosRoutes = new GradosRoutes();
export default gradosRoutes.router;