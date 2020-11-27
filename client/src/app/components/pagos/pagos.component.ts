import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BuscarComponent} from '../buscar/buscar.component';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  buscar(){
    const dialogRef = this.dialog.open(BuscarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
