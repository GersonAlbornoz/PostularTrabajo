import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatosService {

  studentSelected:number=0;
  a_pagar:any[]=[];

  constructor() { }

  setStudent(student:number):number{
     this.studentSelected=student;
     return 0
  }
  getStudent():number{
    return this.studentSelected;
  }
  agregarPagos(n:any):number{
    this.a_pagar.push(n);
    return 0;
  }
  limpiarPagos():number{
    this.a_pagar=[];
    return 0;
  }
}
