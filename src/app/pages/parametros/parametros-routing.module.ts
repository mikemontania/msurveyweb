import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { EncuestasComponent } from './encuestas/encuestas.component';

const parametrosRoutes: Routes = [
  { path: 'encuestas', component: EncuestasComponent, data: { titulo: 'encuestas' } }, 
];
@NgModule({
  imports: [RouterModule.forChild(parametrosRoutes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
