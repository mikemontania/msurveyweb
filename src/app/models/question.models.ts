import { Answer } from "./answer.model";
 
export class Question {


  codQuestion?: number;
  questionText: string;
  questionType: string;
  alignment: string;
  bold: string;
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
  