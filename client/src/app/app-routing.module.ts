import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudiantesComponent} from './components/estudiantes/estudiantes.component';
import { PagosComponent} from './components/pagos/pagos.component';
import { ReportesComponent} from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Estudiantes',
    pathMatch:'full'
  },
  {
    path:'Estudiantes',
    component:EstudiantesComponent
  },
  {
    path:'Pagos',
    component:PagosComponent
  },
  {
    path:'Reportes',
    component:ReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
