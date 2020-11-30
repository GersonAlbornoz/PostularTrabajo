import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../modules/Student';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  API_URL = "http://localhost:3000/api/students";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.API_URL);
  }
  getOne(id:number){
    return this.http.get(this.API_URL+'/'+id);
  }
  create(student:Student,foto:File){
    const fd = new FormData();
    fd.append('fname',student.fname);
    fd.append('lname1',student.lname1);
    fd.append('lname2',student.lname2);
    fd.append('grado', JSON.stringify(student.grado) );
    fd.append('nace',JSON.stringify(student.nace));
    fd.append('image',foto);
    return this.http.post(this.API_URL,fd);
  }
}
