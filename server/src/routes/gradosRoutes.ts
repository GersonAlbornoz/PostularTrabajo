import {Router} from 'express';
import {list} from '../controllers/gradosController'

class GradosRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',list);
    }
}

const gradosRoutes = new GradosRoutes();
export default gradosRoutes.router;