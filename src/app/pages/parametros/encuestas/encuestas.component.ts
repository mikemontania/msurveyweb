import { Component } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/ApiService/ApiService.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent {
  encuestas: Survey[] = [];

  constructor(private encuestaService: ApiService) { }

  ngOnInit() {
    this.cargarEncuestas();
  }

  cargarEncuestas(): void {
    this.encuestaService.getSurveys()
      .subscribe((encuestas: Survey[]) => {
        this.encuestas = encuestas;
      });
  }

}
