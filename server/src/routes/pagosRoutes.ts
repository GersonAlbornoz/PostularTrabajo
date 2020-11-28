import {Router} from 'express';
import {insertar,list,mes,pagar,anular} from '../controllers/pagosController'

class GradosRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/insertar',insertar);
        this.router.get('/:id',list);
        this.router.get('/mes/:id',mes);
        this.router.get('/pagar/:id',pagar);
        this.router.get('/anular/:id',anular);
    }
}

const gradosRoutes = new GradosRoutes();
export default gradosRoutes.router;