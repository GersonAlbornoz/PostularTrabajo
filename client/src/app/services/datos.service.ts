import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatosService {

  studentSelected:number=0;

  constructor() { }

  setStudent(student:number):number{
     this.studentSelected=student;
     return 0
  }
  getStudent():number{
    return this.studentSelected;
  }
}
