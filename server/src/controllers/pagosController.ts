import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import pool from '../database'

export const insertar = async(req:Request,res:Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('select matricular1();select matricular2();select matricular3();');
        return res.json({
            message:'Movimientos insertados'
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const pagar = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('update movimiento set estado=$1 where id_movimiento=$2;',['PAGADO',id]);
        return res.json({
            message:'Pagados'
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const anular = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('update movimiento set estado=$1 where id_movimiento=$2;',['ANULADO',id]);
        return res.json({
            message:'Anulados'
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const list = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('SELECT M.id_movimiento,M.id_persona,M.monto,M.estado,Date(D.fecha_venci) as fecha_venci, mes(M.id_detalle_cronograma),false as checked,M.estado!=$1 and M.estado!=$2  as notdisabled FROM movimiento M,detalle_cronograma D where M.id_detalle_cronograma=D.id_detalle_cronograma and id_persona = $3 order by D.fecha_venci',['PAGADO','ANULADO',id]);
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const mes = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('SELECT mes($1)',[id]);
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}