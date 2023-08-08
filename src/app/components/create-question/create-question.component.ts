import { Component, EventEmitter, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.models';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  // Propiedades del formulario
  showQuestion: boolean = false;

  answerText: string = '';
  answers: Answer[] = [];
question: Question = new Question();
  // Evento de salida para la pregunta creada
  @Output() questionCreated = new EventEmitter<any>();
  constructor() {
    this.question.questionText ='';
    this.question.questionType ='INPUT';
    this.question.alignment ='left';
    this.question.alignment ='normal';
    this.answers.push({
      codAnswer: 1,
      answerType: '',
      answerText: '',
      codQuestion: null,
      amount:0,
      obligatory:false,
      createdAt: new Date(),
      createdBy: '',
      updatedAt: new Date(),
      updatedBy: ''
    });
  }
  // Método para manejar el envío del formulario

  onSubmit() {
    
    this.question.answer=this.answers
    // Emitir el evento questionCreated con la pregunta creada
    this.questionCreated.emit(this.question);
  }
  addAnswer() {
    const newAnswer: Answer = {
      codAnswer: this.answers.length + 1,
      answerType: '',
      answerText: '',
      codQuestion: null,
      obligatory:false,
      amount:0,
      createdAt: new Date(),
      createdBy: '',
      updatedAt: new Date(),
      updatedBy: ''
    };

    this.answers.push(newAnswer);
  }
  showQuestionText() {
    this.showQuestion = true;
  }

  clearQuestionText() {
    this.showQuestion = false;
    this.question.questionText = '';
  }
  removeAnswer(index: number) {
    this.answers.splice(index, 1);
  }
}
