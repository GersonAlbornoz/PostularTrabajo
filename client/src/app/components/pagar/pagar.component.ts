import { Component, OnInit } from '@angular/core';

import {DatosService} from '../../services/datos.service';
import {EstudiantesService} from '../../services/estudiantes.service';
import {PagosService} from '../../services/pagos.service';

export interface Student{
  nid_persona?:number;
  nom_persona?:string;
  ape_pate_pers?:string;
  ape_mate_pers?:string;
  foto_ruta?:string;
}

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];

  students:any=[];
  total:number=0;

  constructor(public datosService:DatosService,private estudiantesService:EstudiantesService,private pagosService:PagosService) { }

  ngOnInit(): void {
    for(let d of this.datosService.a_pagar){
      this.estudiantesService.getOne(d.id_persona).subscribe(
        res=>{
            this.students=res;
        },
        err=>console.error(err))
        this.total=this.total+parseInt(d.monto);
    }
  }
  pagar(){
    for(let i of this.datosService.a_pagar){
      this.pagosService.pagar(i.id_movimiento).subscribe(
        res=>{
      },
      err=>console.error(err)
      );
    }
  }
}
