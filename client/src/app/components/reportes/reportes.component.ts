import { Component, OnInit,AfterViewChecked,OnChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {PagarComponent} from '../pagar/pagar.component';

import {DatosService} from '../../services/datos.service';
import {PagosService} from '../../services/pagos.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:any=[];
  mesActual:number;
  constructor(public dialog: MatDialog,public datosService:DatosService,private pagosService:PagosService) { }

  ngOnInit(): void {
    this.actualizar();
  }
  capital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  disabled(i:number,ds:boolean):boolean{
    if(i>this.mesActual){
      if(this.dataSource[i-1].checked){
        return false;
      }else{
        return true;
      }
    }
    return ds;
  }

  check(){
    let c:number=0;
    for(let i of this.dataSource){

    if(c>this.mesActual){
      if(!this.dataSource[c-1].checked){
        this.dataSource[c].checked=false;
      }
    }
    c++;
    }
  }

  pagar(){
    for(let i of this.dataSource){
      if(i.checked){
        let n=this.datosService.agregarPagos(i);
      }
    }
    const dialogRef = this.dialog.open(PagarComponent);
    dialogRef.afterClosed().subscribe(result => {
      let n=this.datosService.limpiarPagos();
      this.actualizar();
    });
  }

  actualizar(){
    this.pagosService.list(12).subscribe(
      res=>{
          this.dataSource=res;
          let c:number=0;
          let n:number=0;
          for(let i of this.dataSource){
            if(i.notdisabled){
              if(n===0){
                this.mesActual=c;
              }else{
                i.notdisabled=false;
              }
              n++;
            }
            c++;
          }
          
      },
      err=>console.error(err)
  );
  }
  anular(){
    for(let i of this.dataSource){
      if(i.checked){
        this.pagosService.anular(i.id_movimiento).subscribe(
          res=>{
            
        console.log(i)
        this.actualizar();
        },
        err=>console.error(err)
        );
      }
    }
  }
  buttonDisabled():boolean{
    for(let i of this.dataSource){
      if(i.checked){
        return false;
      }
    }
    return true;
  }
}
