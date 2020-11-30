import {Router} from 'express';
import {list,create,deleteStudent,names,one,createPhoto} from '../controllers/estudiantesController'
import multer from '../libs/multer';

class EstudiantesRoutes{

    public router:Router =Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',list);
        this.router.get('/:id',one);
        this.router.get('/names',names);
        this.router.post('/',multer.single('image'),create);
        this.router.post('/foto',multer.single('image'),createPhoto);
        this.router.delete('/:id',deleteStudent);
    }
}

const estudiantesRoutes = new EstudiantesRoutes();
export default estudiantesRoutes.router;