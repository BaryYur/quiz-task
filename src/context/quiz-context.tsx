import React, { useState } from "react";

import { Quiz, UserQuiz } from "../types";

type QuizContextTypes = {
  quizzes: Quiz[];
  userQuizzes: UserQuiz[];
  currentQuiz: Quiz | null;
  changeQuiz: (id: string, quiz: Quiz) => Promise<void>;
  addQuiz: (quiz: Quiz) => Promise<void>;
  getCurrentQuiz: (id: string) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;
  searchQuizzes: (name: string) => Promise<void>;
  searchingLoading: boolean;
};

const QuizContext = React.createContext({
  // getCurrentQuiz: (id) => {},
  // addQuiz: (quiz) => {},
  // changeQuiz: (id, quiz) => {},
  // deleteQuiz: (id) => {},
} as QuizContextTypes);

export const QuizContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(
    JSON.parse(localStorage.getItem("quizzes") || "[]")
  );
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [userQuizzes, setUserQuizzes] = useState<UserQuiz[]>(
    JSON.parse(localStorage.getItem("userQuizzes") || "[]")
  );
  const [searchingLoading, setSearchingLoading] = useState(false);

  const addQuiz = (quiz: Quiz): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const localQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
          localQuizzes.push(quiz);

          const localUserQuizzes = JSON.parse(localStorage.getItem("userQuizzes") || "[]");
          localUserQuizzes.push({ quizId: quiz.id, currentQuestionNumber: 1, answers: [] });

          localStorage.setItem("quizzes", JSON.stringify(localQuizzes));
          localStorage.setItem("userQuizzes", JSON.stringify(localUserQuizzes));

          setQuizzes(prevQuiz => [...prevQuiz, quiz]);
          setUserQuizzes(prevItem => {
            return [...prevItem, { quizId: quiz.id, currentQuestionNumber: 1, answers: [] }];
          });

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const getCurrentQuiz = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const quiz = quizzes.find(q => q.id === id);

          if (quiz) {
            setCurrentQuiz(quiz);
            resolve();
          } else {
            reject(new Error("Quiz not found"));
          }
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const changeQuiz = (id: string, quiz: Quiz): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const localQuizzes: Quiz[] = JSON.parse(localStorage.getItem("quizzes") || "[]");

          for (const localQuiz of localQuizzes) {
            if (localQuiz.id === id) {
              localQuiz.name = quiz.name;
              localQuiz.questions = quiz.questions;
            }
          }

          const localUserQuizzes = JSON.parse(localStorage.getItem("userQuizzes") || "[]");

          for (const localUserQuiz of localUserQuizzes) {
            if (localUserQuiz.id === id) {
              localUserQuiz.currentQuestionNumber = 1;
              localUserQuiz.answers = [];
            }
          }

          localStorage.setItem("quizzes", JSON.stringify(localQuizzes));
          localStorage.setItem("userQuizzes", JSON.stringify(localUserQuizzes));
          setQuizzes(localQuizzes);

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  const deleteQuiz = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let localQuizzes: Quiz[] = JSON.parse(localStorage.getItem("quizzes") || "[]");
          localQuizzes = localQuizzes.filter((quiz) => quiz.id !== id);

          localStorage.setItem("quizzes", JSON.stringify(localQuizzes));
          setQuizzes(quizzes.filter(quiz => quiz.id !== id));

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  };

  const searchQuizzes = (name: string): Promise<void> => {
    setSearchingLoading(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const localQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
          const filteredQuizzes = localQuizzes.filter((quiz: Quiz) =>
            quiz.name.toLowerCase().includes(name.toLowerCase())
          );
          setQuizzes(filteredQuizzes);

          resolve();
        } catch (error) {
          reject(error);
        } finally {
          setSearchingLoading(false);
        }
      }, 500);
    });
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        userQuizzes,
        currentQuiz,
        addQuiz,
        getCurrentQuiz,
        changeQuiz,
        deleteQuiz,
        searchQuizzes,
        searchingLoading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;