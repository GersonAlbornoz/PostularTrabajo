import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import pool from '../database'

export const list = async(req:Request,res:Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('SELECT * FROM grado order by nid_grado');
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}