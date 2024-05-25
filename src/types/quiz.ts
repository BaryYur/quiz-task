export type Quiz = {
  id: string;
  name: string;
  questions: Question[];
};

export type Question = {
  id: string;
  title: string;
  points: number;
  name: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  name: string;
  text: string;
  isRight: boolean;
};

export type UserQuiz = {
  quizId: string;
  currentQuestionNumber: number;
  answers: {
    id: string;
    isRight: boolean;
    points: number;
  }[];
};