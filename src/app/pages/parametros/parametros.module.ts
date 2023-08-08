import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { NgbPaginationModule, NgbAlertModule, NgbModule, NgbHighlight } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
  
    EncuestasComponent,
        EncuestaComponent
  ],
  exports: [
    EncuestasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ParametrosRoutingModule,
    RouterModule,
    NgOptionHighlightModule,
    NgbPaginationModule,
    NgbModule,


  ]
})
export class ParametrosModule { }
