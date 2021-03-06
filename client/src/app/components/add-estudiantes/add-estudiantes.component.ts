import { Component, OnInit,HostBinding } from '@angular/core';

import {Student} from '../../modules/Student';

import {EstudiantesService} from '../../services/estudiantes.service';
import { GradosService} from '../../services/grados.service';
import {PagosService} from '../../services/pagos.service';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-estudiantes',
  templateUrl: './add-estudiantes.component.html',
  styleUrls: ['./add-estudiantes.component.css']
})
export class AddEstudiantesComponent implements OnInit {

  @HostBinding('class') classes ='row';

  file:File;
  photoSelected:string | ArrayBuffer;
  grados:any=[];
  alumno:Student={
    fname:'',
    lname1:'',
    lname2:'',
    grado:0,
    nace:new Date(),
    image:null
  }
  constructor(private gradosService:GradosService,
    private estudiantesService:EstudiantesService,
    private pagosService:PagosService) { }

  ngOnInit(): void {
    this.gradosService.getAll().subscribe(
      res=>{
          this.grados=res;
      },
      err=>console.error(err)
  )
  }

  calcularEdad(nace:Date){
    var time = new Date().getTime() - nace.getTime();
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

  agregar(){
    this.estudiantesService.create(this.alumno,this.file).subscribe(
      res =>{
        console.log(res)
        this.pagosService.insertar(0).subscribe(
          res =>{
            console.log(res)
          },
          err => console.error(err)
        )
          this.alumno.fname='';
          this.alumno.lname1='';
          this.alumno.lname2='';
          this.alumno.grado=0;
          this.alumno.nace=new Date();
          this.alumno.image=null;
          this.file=null;
      },
      err => console.error(err)
    )
  }

  onPhotoSelected(event:HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.file=<File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e =>this.photoSelected=reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
