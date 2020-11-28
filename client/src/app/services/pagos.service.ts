import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  API_URL = "http://localhost:3000/api/pagos";

  constructor(private http:HttpClient) { }

  insertar(n:number){
    return this.http.get(this.API_URL+'/insertar');
  }
  list(n:number){
    return this.http.get(this.API_URL+'/'+n);
  }
  mes(n:number){
    return this.http.get(this.API_URL+'/mes/'+n);
  }
  pagar(n:number){
    return this.http.get(this.API_URL+'/pagar/'+n);
  }
  anular(n:number){
    return this.http.get(this.API_URL+'/anular/'+n);
  }
}
