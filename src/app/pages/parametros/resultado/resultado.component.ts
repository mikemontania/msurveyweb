import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question.models';
import { Survey } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/ApiService/ApiService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
survey:Survey;
questions:Question[] =[];
  constructor(private route: ActivatedRoute,
    private surveyService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {


  }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      const surveyId = +params['id']; // Convierte el parámetro a número

      if (surveyId) {
        this.surveyService.getSurveyResultById(surveyId).subscribe((s) => {
          console.log(s)
          this.survey =s;
          this.questions =s.questions
        });
      } else {
        this.router.navigate(['/parametros/encuestas']);
        Swal.fire('Atención', `No existe encuesta`, 'error');
      }
    });

  }
  showLocationOnMap(data){
    console.log(data)
  }



  success(err) {
    this.toastr.success(err, 'success',
      { timeOut: 2500 });
  }
}
