import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { FormsModule } from '@angular/forms';
import { LoandTermSliderComponent } from './loand-term-slider/loand-term-slider.component';
import { AppCustomRatingComponent } from './app-custom-rating/app-custom-rating.component';
import { NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { QuestionListComponent } from './question-list/question-list.component';
import { CaritaButtonComponent } from './carita-button/carita-button.component';
import { MapComponent } from './mapa/mapa.component';
import { ResultTextComponent } from './result-text/result-text.component';
import { ResultMapComponent } from './result-map/result-map.component';
import { ResultChartsComponent } from './result-charts/result-charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    CreateQuestionComponent,
    LoandTermSliderComponent,
    AppCustomRatingComponent,
    QuestionListComponent,
    CaritaButtonComponent,
    MapComponent,
    ResultTextComponent,
    ResultMapComponent,
    ResultChartsComponent
  ],
  exports: [
    CreateQuestionComponent,
    LoandTermSliderComponent,
    AppCustomRatingComponent,
    QuestionListComponent,
    MapComponent,
    ResultTextComponent,
    ResultMapComponent,
    ResultChartsComponent  ],
  imports: [
    CommonModule,
     FormsModule,
     NgbRating,
     NgxChartsModule
  ]
})
export class ComponentsModule { }
