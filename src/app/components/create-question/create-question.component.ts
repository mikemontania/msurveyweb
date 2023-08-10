import { Component, EventEmitter, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.models';
import { SurveyResponse } from 'src/app/models/responseSurvey.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  // Propiedades del formulario
  showQuestion: boolean = false;
  loanTerm: number = 10;
  unitText: string = 'opciones';
  rangeValue: number = 1;
  cantidad: number = 1;
  answerText: string = '';
  answers: Answer[] = [];
  optionDescriptions: string[] = [];

  question: Question = new Question();
  // Evento de salida para la pregunta creada
  @Output() questionCreated = new EventEmitter<any>();
  constructor() {
    this.question.questionText = '';
    this.question.questionType = 'INPUT';
    this.question.alignment = 'left';
    this.question.alignment = 'normal';
    this.question.amount = 3;
    this.question.response = new SurveyResponse();
    this.question.obligatory = false;
    this.answers = [];
  }
  // Método para manejar el envío del formulario

  async onSubmit() {
    const newQuestion = { ...this.question }; // Crear una nueva instancia de Question

    if (newQuestion.questionType == 'CHECKBOX' || newQuestion.questionType == 'RADIOBUTTON') {
      newQuestion.answer = this.optionDescriptions.map((description, i) => ({
        codAnswer: null,
        answerType: newQuestion.questionType,
        answerText: description,
        codQuestion: null,
        createdAt: new Date(),
        createdBy: '',
        updatedAt: new Date(),
        updatedBy: ''
      }));
    } else {
      newQuestion.answer = [{
        codAnswer: null,
        answerType: newQuestion.questionType,
        answerText: '',
        codQuestion: null,
        createdAt: new Date(),
        createdBy: '',
        updatedAt: new Date(),
        updatedBy: ''
      }];
    }

    // Resto de la lógica para guardar la pregunta

    this.questionCreated.emit(newQuestion);
  }
  addAnswer() {
    const newAnswer: Answer = {
      codAnswer: this.answers.length + 1,
      answerType: '',
      answerText: '',
      codQuestion: null,
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
  onQuestionTypeChange() {
    this.question.amount = 3;
    this.cantidad = 1;
    this.rangeValue = 1;
  }
  createRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
  clearQuestionText() {
    this.showQuestion = false;
    this.question.questionText = '';
  }
  removeAnswer(index: number) {
    this.answers.splice(index, 1);
  }
  onSliderValueChange(newValue: number): void {
    this.question.amount = newValue;
    this.optionDescriptions = Array(newValue).fill('');
  }
}
