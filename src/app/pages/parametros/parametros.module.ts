import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { NgbPaginationModule, NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/components/components.module';
import { ResultadoComponent } from './resultado/resultado.component';

@NgModule({
  declarations: [

    EncuestasComponent,
    EncuestaComponent,
    ResultadoComponent
  ],
  exports: [
    EncuestasComponent,
    ResultadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParametrosRoutingModule,
    RouterModule,
    NgbPaginationModule,
    NgbModule,
    ComponentsModule
  ]
})
export class ParametrosModule { }
