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
  create(student:Student){
    return this.http.post(this.API_URL,student);
  }
}
