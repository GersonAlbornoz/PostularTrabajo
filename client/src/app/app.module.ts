import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AddEstudiantesComponent } from './components/add-estudiantes/add-estudiantes.component';
import { BuscarComponent } from './components/buscar/buscar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EstudiantesComponent,
    PagosComponent,
    ReportesComponent,
    AddEstudiantesComponent,
    BuscarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
