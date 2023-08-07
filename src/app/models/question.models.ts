import { Options } from "./option.models";

export class Question {
    constructor(
      public id: number,
      public questionText: string,
      public questionType: string,
      public options?: Options[]
    ) {}
  }
  