import React, {useContext, useEffect, useState} from "react";

import { Quiz } from "../../types";

import { useNavigate } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Check, RotateCcw, X } from "lucide-react";

type QuizResultsProps = {
  quizId: string;
  currentQuiz: Quiz;
};

export const QuizResults: React.FC<QuizResultsProps> = ({ quizId, currentQuiz }) => {
  const { userQuizzes, quizzes } = useContext(QuizContext);
  const navigate = useNavigate();
  const quizIndex = quizzes.findIndex(item => item.id === quizId);
  const [userScore, setUserScore] = useState(0);

  const resetQuiz = () => {
    for (const quiz of userQuizzes) {
      if (quiz.quizId === quizId) {
        quiz.currentQuestionNumber = 1;
        quiz.answers = [];
      }
    }

    localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));
    navigate("/");
  };

  const getUserScore = () => {
    setUserScore(0);

    for (const quiz of userQuizzes) {
      if (quiz.quizId === quizId) {
        for (const answer of quiz.answers) {
          setUserScore(score => score + answer.points);
        }
      }
    }
  };

  useEffect(() => {
    getUserScore();
  }, []);

  return (
    <div className="pt-[40px]">
      <div className="flex justify-between w-[800px] m-auto">
        <p className="font-semibold text-[20px]">Total score: {userScore}</p>
        <button
          onClick={resetQuiz}
          className="flex items-center text-gray-600 gap-[8px]"
        >
          <span>Reset quiz</span>
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="w-[800px] m-auto mt-[30px]">
        <ul className="flex flex-col gap-[20px]">
          {currentQuiz?.questions.map((question, questionIndex) => (
            <li
              key={question.id}
            >
              <span className="text-[18px] font-semibold">{question.title}</span>

              <ul className="flex flex-col gap-[1px] mt-[10px]">
                {question.answers.map((answer, answerIndex) => (
                  <li
                    key={answer.id}
                    className={`
                      ${answerIndex === 0 && "rounded-t-[8px]"}
                      ${answerIndex === question.answers.length - 1 && "rounded-b-[8px]"}
                      ${answer.isRight && "bg-green-200"}
                      ${
                        userQuizzes[quizIndex].answers[questionIndex].id === answer.id &&
                        !userQuizzes[quizIndex].answers[questionIndex].isRight && "bg-red-200"
                      }
                      p-[20px] bg-gray-100 flex justify-between items-center gap-[10px]
                    `}
                  >
                    <span>{answer.text}</span>
                    {(userQuizzes[quizIndex].answers[questionIndex].id === answer.id &&
                      userQuizzes[quizIndex].answers[questionIndex].isRight) && <Check size={18} />
                    }
                    {userQuizzes[quizIndex].answers[questionIndex].id === answer.id &&
                      !userQuizzes[quizIndex].answers[questionIndex].isRight && <X size={18} />}
                  </li>
                ))}
              </ul>

              <div className="mt-[8px] font-semibold">
                Points: {userQuizzes[quizIndex].answers[questionIndex].isRight ? <span>{question.points}</span> : <span>0</span>} / {question.points}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};