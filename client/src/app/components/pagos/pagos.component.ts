import { Component, OnInit,DoCheck,AfterContentChecked,AfterViewChecked } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BuscarComponent} from '../buscar/buscar.component';

import {DatosService} from '../../services/datos.service';
import {PagosService} from '../../services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  selectedStudent:number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource:any=[];

  constructor(public dialog: MatDialog,public datosService:DatosService, private pagosService:PagosService) { }

  ngOnInit(): void {
    if(this.datosService.studentSelected!==0){
      this.pagosService.list(this.datosService.studentSelected).subscribe(
        res=>{
            this.dataSource=res;
        },
        err=>console.error(err)
    );
    }
  }

  ngDoCheck(): void {
    
    
  }

  ngAfterViewChecked(): void {
    if(this.datosService.studentSelected!==0){
      this.pagosService.list(this.datosService.studentSelected).subscribe(
        res=>{
            this.dataSource=res;
        },
        err=>console.error(err)
    );
    }
  }

  buscar(){
    const dialogRef = this.dialog.open(BuscarComponent);
    let c:number=this.datosService.setStudent(0);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  capital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
