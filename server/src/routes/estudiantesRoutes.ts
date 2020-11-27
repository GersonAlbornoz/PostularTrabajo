import {Router} from 'express';
import {list,create,deleteStudent,names} from '../controllers/estudiantesController'

class EstudiantesRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',list);
        this.router.get('/names',names);
        this.router.post('/',create);
        this.router.delete('/:id',deleteStudent);
    }
}

const estudiantesRoutes = new EstudiantesRoutes();
export default estudiantesRoutes.router;