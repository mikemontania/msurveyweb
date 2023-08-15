import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Choice } from 'src/app/models/choice.model';
import { Question } from 'src/app/models/question.models';
import { Survey } from 'src/app/models/survey.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/ApiService/ApiService.service';
import { LoginService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  selectedImage: File;
  surveyForm: FormGroup;
  newQuestion: Question = new Question();
  survey: Survey = new Survey();
  question: Question = new Question();
  choice: Choice = new Choice();
  user: User;
  questions: Question[] = [];
  choices: Choice[] = [];
  titleEditMode = false;
  descriptionEditMode = false;
  rangeValue: number = 1;
  quantity: number = 1;
  constructor(
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _surveyServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

    this.survey.codSurvey = null;
    this.survey.title = 'Titulo';
    this.survey.description = 'Descripcion';
    this.survey.img = '';
    this.survey.active = true;
    this.survey.creationDate = new Date();
    this.survey.codUser = this._loginService.user.codUser;
    this.survey.Questions = []


    this.question.codQuestion = null;
    this.question.questionText = '';
    this.question.alignment = '';
    this.question.bold = '';
    this.question.img = '';
    this.question.codSurvey = null;
    this.question.Choices = [];

    this.choice.codChoice = null;
    this.choice.choiceType = '';
    this.choice.choiceText = '';
    this.choice.codQuestion = null;
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      questions: []
    });
  }

  ngOnInit() {
    this.user = this._loginService.user;
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this._surveyServices.getSurveyById(id).subscribe((s) => {
          console.log(s.survey)
          this.survey = { ...s.survey };
          this.questions = [...s.survey.Questions];
        });
      }
    });
  }

  handleQuestionCreated(question: any) {
    console.log('Pregunta creada en el componente padre:', question);
    if (question) {
      this.questions = [...this.questions, question];
      console.log('array:', this.questions);
    }
    // Aquí puedes realizar cualquier otra lógica con la pregunta creada
  }

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onRangeValueChange(event) { console.log(event) }
  onQuantityChange(event) { console.log(event) }

  create(): void {
    this.survey.Questions = this.questions;
    this._surveyServices.createSurvey(this.survey)
      .subscribe(
        surveys => {
          this.router.navigate(['/parametros/encuestas']);
          Swal.fire('Nuevo encuesta', `El encuesta ${this.survey.description} ha sido creado con éxito`, 'success');
        }
      );
  }

  update(): void {
    this._surveyServices.updateSurvey(this.survey)
      .subscribe(
        json => {
          this.router.navigate(['/parametros/encuestas']);
          Swal.fire('encuesta Actualizado', `encuesta  : ${json.description}`, 'success');
        }
      );
  }

  invalido() {
    this.toastr.error('Favor completar todos los campos correctamente', 'Invalido',
      { timeOut: 1500 });
  }
  toggleTitleEditMode() {
    this.titleEditMode = !this.titleEditMode;
  }

  toggleDescriptionEditMode() {
    this.descriptionEditMode = !this.descriptionEditMode;
  }




  addChoice(question: Question) {
    if (!question.Choices) {
      question.Choices = [];
    }
    question.Choices.push(new Choice());
  }

  removeChoice(question: Question, index: number) {
    if (question.Choices) {
      question.Choices.splice(index, 1);
    }
  }

  removeQuestion(index: number) {
    this.surveyForm.get('questions').value.splice(index, 1);
  }

  submitSurvey() {
    if (this.surveyForm.valid) {
      const survey: Survey = this.surveyForm.value;
      console.log(survey); // Aquí puedes enviar la encuesta al servidor o realizar las acciones necesarias
    }
  }












  error(err) {
    this.toastr.error(err, 'Error',
      { timeOut: 2500 });
  }

  toUpeCaseEvent(evento: string) {
    return evento.toLocaleUpperCase();
  }
}
