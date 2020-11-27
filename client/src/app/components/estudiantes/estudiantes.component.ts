import { Component, OnInit } from '@angular/core';
import {EstudiantesService} from '../../services/estudiantes.service';
import {MatDialog} from '@angular/material/dialog';
import {AddEstudiantesComponent} from '../add-estudiantes/add-estudiantes.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredCards: Observable<any[]>;
    students:any =[];
    sinFiltrar:boolean=true;
  constructor(private estudiantesService:EstudiantesService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.estudiantesService.getAll().subscribe(
        res=>{
            this.students=res;
            for(let st of this.students){
              this.options.push(st.nom_persona+' '+st.ape_pate_pers);
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
      map(value => this.filtrar(value)))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private filtrar(value: string): any[]{
    const filterValue = value.toLowerCase();
    return this.students.filter(st=>st.nom_persona.toLowerCase().indexOf(filterValue) === 0);
  }

  gridColumns = 3;
  
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEstudiantesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.estudiantesService.getAll().subscribe(
        res=>{
            this.students=res;
        },
        err=>console.error(err)
    );
    });
  }
  
  calcularEdad(nace:string){
    var time = new Date().getTime() - new Date(nace).getTime();
    var years= Math.trunc(time/(24*60*60*1000*365.25));
    var months =Math.trunc(time*12/(24*60*60*1000*365.25))-years*12;
    return years+' año(s) y '+months+' mese(s)';
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