import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/models/question.models';
 
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent  implements OnInit, OnChanges{
  @Input() questions: Question[];
  optionDescriptions: string[] = [];
  rangeValue: number = 0; // Agregar esta propiedad para el rango
  cantidad: number = 0;   // Agregar esta propiedad para la cantidad de estrellas
 
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.questions)
  }
  ngOnInit(): void {
   console.log(this.questions)
  }
  createRange(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
