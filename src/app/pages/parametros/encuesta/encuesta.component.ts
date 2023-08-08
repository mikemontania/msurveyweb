import { Component, OnInit } from '@angular/core';
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
  survey: Survey = new Survey();
  question: Question = new Question();
  answer: Answer = new Answer();
  user: User; 

  constructor(
    private _loginService: LoginService,
    private toastr: ToastrService,
    private _encuestasServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  this.survey.codSurvey=null;
  this.survey.title= '';
  this.survey.description= '';
  this.survey.img= '';
  this.survey.active= true;
  this.survey.creationDate =new Date();
  this.survey.codUser = this._loginService.user.codUser;
  this.survey.questions = []


  this.question.codQuestion =null;
  this.question.questionText='';
  this.question.questionType='';
  this.question.img='';
  this.question.codSurvey=null;
  this.question.answer = []; 

  this.answer.codAnswer = null;
  this.answer.answerType= '';
  this.answer.answerText= '';
  this.answer.codQuestion = null; 
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

  error(err) {
    this.toastr.error(err, 'Error',
      { timeOut: 2500 });
  }

  toUpeCaseEvent(evento: string) {
    return evento.toLocaleUpperCase();
  }
}
