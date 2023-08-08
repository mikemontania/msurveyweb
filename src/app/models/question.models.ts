import { Answer } from "./answer.model";
import { Options } from "./option.models";

export class Question {


  codQuestion?: number;
  questionText: string;
  questionType: string;
  img?: string;
  codSurvey: number;
  answer?: Answer[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
   


    constructor(
    
    ) {}
  }
  