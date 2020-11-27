import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradosService {

  API_URL = "http://localhost:3000/api/grados";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.API_URL);
  }
}
