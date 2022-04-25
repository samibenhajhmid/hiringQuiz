import { Moment } from 'moment';

export const enum QuizLevel {
  PARTICULIER = 'PARTICULIER',
  SOCIETE = 'SOCIETE',
  SOCIETEIMMOBILIERE = 'SOCIETEIMMOBILIERE'
}

export interface IQuiz {
  id?: number;
  title?: string;
  description?: string;
  Published?: boolean;
  creationDate?: Moment;
  modificationDate?:Moment;
  level?: QuizLevel;

}

export class Quiz implements IQuiz {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public Published?:boolean,
    public creationDate?: Moment,
    public modificationdate?: Moment,
    public level?: QuizLevel,

  ) {}
}
