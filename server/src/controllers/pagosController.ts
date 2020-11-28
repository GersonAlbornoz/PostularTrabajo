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