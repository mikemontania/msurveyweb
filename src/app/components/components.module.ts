import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CreateQuestionComponent
  ],
  exports: [
    CreateQuestionComponent
  ],
  imports: [
    CommonModule,
     FormsModule,
  ]
})
export class ComponentsModule { }
