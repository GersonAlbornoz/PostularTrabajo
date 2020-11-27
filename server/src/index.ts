import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import estudiantesRoutes from './routes/estudiantesRoutes';
import gradosRoutes from './routes/gradosRoutes';

class Server{
    
    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/students',estudiantesRoutes);
        this.app.use('/api/grados',gradosRoutes);
    }

    start():void{
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port ',this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();