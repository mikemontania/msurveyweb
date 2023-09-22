import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-charts',
  templateUrl: './result-charts.component.html',
  styleUrls: ['./result-charts.component.css']
})
export class ResultChartsComponent {
  @Input() question: any;

  // Configuración del gráfico
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = ' ';
  showYAxisLabel = true;
  yAxisLabel = ' ';
  currentChartType: string = 'bar'; // Tipo de gráfico actual
  colorScheme: any;

  // Datos del gráfico
  single: any[] = [];

  // Evento que se dispara cuando se hace clic en una barra del gráfico
  onSelect(event: any): void {
    console.log(event);
  }

  // Método para cambiar el tipo de gráfico
  changeChartType(chartType: string): void {
    this.currentChartType = chartType;
  }
// Método para generar colores aleatorios
generateColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push('#' + Math.floor(Math.random()*16777215).toString(16));
  }
  return colors;
}
  ngOnChanges(): void {
    // Convierte los datos de la pregunta en el formato adecuado
    if (this.question && (this.question.questionType == 'CHECKBOX' || this.question.questionType == 'RADIOBUTTON') && this.question.resultChartChoices) {
      this.single = this.question.resultChartChoices.map(choice => ({
        name: choice.descripcion,
        value: choice.cantidad,
        extra: choice.cantidad // Agrega la cantidad como extra
      }));
    }

    if (this.question && (this.question.questionType == 'RANGE' || this.question.questionType == 'CARITAS') && this.question.resultChartValue) {
      console.log(this.question)
      this.single = this.question.resultChartValue.map(choice => ({
        name: choice.descripcion,
        value: choice.cantidad,
        extra: choice.cantidad // Agrega la cantidad como extra
      }));
    }

      // Generar colores dinámicamente
      this.colorScheme = {
        domain: this.generateColors(this.single.length)
      };
  }
}
