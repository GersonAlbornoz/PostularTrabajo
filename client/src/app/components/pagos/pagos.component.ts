import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BuscarComponent} from '../buscar/buscar.component';

import {DatosService} from '../../services/datos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  selectedStudent:number;

  constructor(public dialog: MatDialog,public datosService:DatosService) { }

  ngOnInit(): void {
    
  }

  buscar(){
    const dialogRef = this.dialog.open(BuscarComponent);
    let c:number=this.datosService.setStudent(0);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
