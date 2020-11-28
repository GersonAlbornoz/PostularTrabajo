import {Router} from 'express';
import {insertar,list,mes} from '../controllers/pagosController'

class GradosRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/insertar',insertar);
        this.router.get('/:id',list);
        this.router.get('/mes/:id',mes);
    }
}

const gradosRoutes = new GradosRoutes();
export default gradosRoutes.router;