import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const parametrosRoutes: Routes = [
  { path: 'encuestas', component: EncuestasComponent, data: { titulo: 'encuestas' } }, 
  { path: 'encuesta', component: EncuestaComponent, data: { titulo: 'Crear Encuesta' } }, 
  { path: 'encuesta/:id', component: EncuestaComponent, data: { titulo: 'Actualizar Encuesta' } }, 

];
@NgModule({
  imports: [RouterModule.forChild(parametrosRoutes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
