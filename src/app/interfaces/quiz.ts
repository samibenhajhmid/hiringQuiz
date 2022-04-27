export class Quiz {
  id: number;
  title: string;
  description: string;
  relatedAssessment:string;
  isPublished: boolean;
  level:string;
  creationDate:Date;
  modificationDate: Date;

}

export class QuestionModal {
  constructor(
    public id: string,
    public answer: number,
    public imageName: string,
    public options: string[],
    public question: string,
    public participantAnswer: number) { }
}
