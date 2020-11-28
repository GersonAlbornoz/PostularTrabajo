import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import pool from '../database'

export const insertar = async(req:Request,res:Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('select insertarPagos();');
        return res.json({
            message:'Movimientos insertados'
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
        const response:QueryResult=await pool.query('SELECT M.monto,M.estado, mes(M.id_detalle_cronograma),false FROM movimiento M,detalle_cronograma D where M.id_detalle_cronograma=D.id_detalle_cronograma and id_persona = $1 order by D.fecha_venci',[id]);
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