import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuestas/encuestas.component';


@NgModule({
  declarations: [
  
    EncuestasComponent
  ],
  exports: [
    EncuestasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
