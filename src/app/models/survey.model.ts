import { Question } from "./question.models";

export class Survey {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public questions: Question[]
    ) {}
  }