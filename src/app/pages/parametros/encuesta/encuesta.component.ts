import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer.model';
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
  surveyForm: FormGroup;
  newQuestion: Question = new Question();
  questionTypes = ['checkbox', 'radiobutton', 'input', 'textarea'];
  survey: Survey = new Survey();
  question: Question = new Question();
  answer: Answer = new Answer();
  user: User; 
  questions: Question[]=[];
  answers: Answer[]=[];
  titleEditMode = false;
  descriptionEditMode = false;
  constructor(
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _encuestasServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

  this.survey.codSurvey=null;
  this.survey.title= 'Titulo';
  this.survey.description= 'Descripcion';
  this.survey.img= '';
  this.survey.active= true;
  this.survey.creationDate =new Date();
  this.survey.codUser = this._loginService.user.codUser;
  this.survey.questions = []


  this.question.codQuestion =null;
  this.question.questionText='';
  this.question.alignment='';
  this.question.bold='';   
  this.question.img='';
  this.question.codSurvey=null;
  this.question.answer = []; 

  this.answer.codAnswer = null;
  this.answer.answerType= '';
  this.answer.answerText= '';
  this.answer.codQuestion = null;
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
        this._encuestasServices.getSurveyById(id).subscribe((s) => {
          this.survey = s;
        });
      }
    });
  }

  handleQuestionCreated(question: any) {
    console.log('Pregunta creada en el componente padre:', question);
    // Aquí puedes realizar cualquier otra lógica con la pregunta creada
  }



  create(): void {
    this._encuestasServices.createSurvey(this.survey)
      .subscribe(
        encuestas => {
          this.router.navigate(['/encuestas']);
          Swal.fire('Nuevo encuesta', `El encuesta ${this.survey.description} ha sido creado con éxito`, 'success');
        } 
      );
  }

  update(): void {
    this._encuestasServices.updateSurvey(this.survey)
      .subscribe(
        json => {
          this.router.navigate(['/encuestas']);
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


  addQuestion() {
    const question = { ...this.newQuestion }; // Clonamos la pregunta
    this.surveyForm.get('questions').value.push(question);
    this.newQuestion = new Question();
  }

  addAnswer(question: Question) {
    if (!question.answer) {
      question.answer = [];
    }
    question.answer.push(new Answer());
  }

  removeAnswer(question: Question, index: number) {
    if (question.answer) {
      question.answer.splice(index, 1);
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
