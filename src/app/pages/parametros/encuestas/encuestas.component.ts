import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/ApiService/ApiService.service';
import { LoginService } from 'src/app/services/service.index';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent {
  surveys: Survey[] = [];
  cargando: boolean = false;
 tamanhoPag: string = 'md'; 
  paginador: any;
  paginas = [];
  busqueda: string = ''; 
  currentPage: number;
  pageSize: number;
  constructor(private encuestaService: ApiService,
    private _loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public http: HttpClient) { }

  ngOnInit() {
    this.cargarEncuestas();
  }

  cargarEncuestas(): void {
    this.encuestaService.getSurveys()
      .subscribe((surveys: Survey[]) => {
        this.surveys = surveys;
      });
  }

}
