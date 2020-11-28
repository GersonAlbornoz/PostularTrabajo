import { Component, OnInit,AfterViewChecked,ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';

import {EstudiantesService} from '../../services/estudiantes.service';
import {DatosService} from '../../services/datos.service';

export interface Student{
  nid_persona?:number;
  nom_persona?:string;
  ape_pate_pers?:string;
  ape_mate_pers?:string;
  fecha_naci?:string;
  foto_ruta?:string;
  nivel?:string;
  desc_grado?:string;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredCards: Observable<any[]>;
  filteredPages:Observable<any[]>;
    students:any =[];
    students1:any =[];
    studentsPg:any=[];
    sinFiltrar:boolean=true;
    firstPge:boolean=true;
    studentSelected:number;

  constructor(private estudiantesService:EstudiantesService,public datosService:DatosService) { }

  ngOnInit(): void {
    this.estudiantesService.getAll().subscribe(
      res=>{
          this.students=res;
          let c:number=0;
          for(let st of this.students){
            this.options.push(st.nom_persona+' '+st.ape_pate_pers);
            if(c<3){
              this.studentsPg.push(st);
            }
            c++;
          }
      },
      err=>console.error(err)
  )
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredCards = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrar(value)));

  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private filtrar(value: string): any[]{
    const filterValue = value.toLowerCase();
    return this.students.filter(st=>st.nom_persona.toLowerCase().indexOf(filterValue) === 0);
  }

  seleccionado(){
    let c:number=this.datosService.setStudent(this.studentSelected);
  }

  grade(grado:string,nivel:string){
    let n:string;
    let g:string=grado;
    if(nivel==="INI"){
      n='Inicial';
      
    }else if(nivel === 'PRI'){
      n='Primaria';
      if(grado==='Primero'){
        g='1er grado'
      }else if(grado==='Segundo'){
        g='2do grado'
      }else if(grado==='Tercero'){
        g='3er grado'
      }else if(grado==='Cuarto'){
        g='4to grado'
      }else if(grado==='Quinto'){
        g='5to grado'
      }else{
        g='6to grado'
      }
    }else{
      n='Secundaria';
      if(grado==='Primero'){
        g='1er año'
      }else if(grado==='Segundo'){
        g='2do año'
      }else if(grado==='Tercero'){
        g='3er año'
      }else if(grado==='Cuarto'){
        g='4to año'
      }else{
        g='5to año'
      }
    }
    return g+' - '+n
  }
  
}
