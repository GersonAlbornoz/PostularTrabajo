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

export const one = async(req:Request,res:Response): Promise<Response> => {
    try{
        const id= parseInt(req.params.id);
        const response:QueryResult=await pool.query('SELECT nom_persona,ape_pate_pers,ape_mate_pers,foto_ruta FROM persona where nid_persona=$1',[id]);
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
        const {fname,lname1,lname2,grado,nace} = req.body;
        const newPhoto={
            fname:fname,
            lname1:lname1,
            lname2:lname2,
            grado:grado,
            nace:nace,
            foto:req.file.path
        }
        console.log(req.file);
        const response:QueryResult=await pool.query('INSERT INTO persona VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)',[newPhoto.fname,newPhoto.lname1,newPhoto.lname2,newPhoto.grado,nace,newPhoto.foto]);
        return res.json({
            message:'Estudiante Guardado'
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export function createPhoto(req:Request,res:Response){
    const{title,description}=req.body;
    console.log(req.file.path);
    const newPhoto={
        title:title,
        description:description,
        imagePath:req.file.path
    }
    return res.json({
        message:'Photo saved'
    })
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