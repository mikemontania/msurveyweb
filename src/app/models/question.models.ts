import { Choice } from "./choice.model";
import { SurveyResponse } from "./responseSurvey.model";

export class Question {


  codQuestion?: number;
  questionText: string;
  questionType: string;
  alignment: string;
  bold: string;
  obligatory: boolean;
  amount: number;
  img?: string;
  codSurvey: number;
  response?: SurveyResponse;
  Choices?: Choice[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  resultsText?: any;
  resultChartChoices?: any;
  resultChartValue?: any;
  resultAverage?: number;


    constructor(

    ) {}
  }
