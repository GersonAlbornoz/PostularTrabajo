import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import pool from '../database'

export const list = async(req:Request,res:Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('SELECT P.nid_persona,P.nom_persona,P.ape_pate_pers,P.ape_mate_pers,P.fecha_naci,P.foto_ruta,G.nivel,G.desc_grado FROM persona P, grado G where P.nid_grado=G.nid_grado order by P.nid_persona');
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const names = async(req:Request,res:Response): Promise<Response> => {
    try{
        const response:QueryResult=await pool.query('SELECT nom_persona FROM persona order by nom_persona');
        return res.status(200).json(response.rows);
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const create = async(req:Request,res:Response): Promise<Response> => {
    try{
        const {fname,lname1,lname2,grado,nace,foto} = req.body;
        const response:QueryResult=await pool.query('INSERT INTO persona VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)',[fname,lname1,lname2,grado,nace,foto]);
        return res.json({
            message:'Estudiante Guardado'
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const deleteStudent = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('DELETE FROM persona WHERE nid_persona = $1',[id]);
        return res.status(200).json('Estudiante #'+id+' eliminado satisfactoriamente');
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}