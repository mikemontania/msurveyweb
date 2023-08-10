import { Answer } from "./answer.model";
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
  answer?: Answer[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
   


    constructor(
    
    ) {}
  }
  