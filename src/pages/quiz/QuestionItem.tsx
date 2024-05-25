import React, { useContext, useEffect, useState } from "react";

import { Question } from "../../types";

import QuizContext from "../../context/quiz-context";

import { Button } from "../../components";

import { ChevronRight } from "lucide-react";

type QuestionItemProps = {
  quizId: string;
  question: Question;
  getNextQuestion: () => void;
};

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, quizId, getNextQuestion }) => {
  const { userQuizzes } = useContext(QuizContext);
  const [timer, setTimer] = useState(15);
  const [chosenAnswer, setChosenAnswer] = useState({
    id: "",
    isRight: false,
    points: 0,
  });

  const addUserAnswer = () => {
    for (const quiz of userQuizzes) {
      if (quiz.quizId === quizId) {
        if (timer > 0) {
          quiz.answers.push({ id: chosenAnswer.id, isRight: chosenAnswer.isRight, points: chosenAnswer.points });
        } else {
          quiz.answers.push({ id: "", isRight: false, points: chosenAnswer.points });
        }
      }
    }

    localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));

    getNextQuestion();
  };

  useEffect(() => {
    if (timer > 1) {
      return () => {
        setTimeout(() => {
          setTimer(timer => timer - 1);
        }, 1000);
      }
    }
  }, [timer]);

  return (
    <li className="mt-[20px]">
      <span className="text-[18px]">{question.title}</span>

      <ul className="mt-[40px] flex flex-col gap-[1px]">
        {question.answers.map((answer, index) => (
          <li
            key={answer.id}
            onClick={() => {
              if (answer.isRight) {
                setChosenAnswer({ id: answer.id, isRight: answer.isRight, points: question.points });
              } else {
                setChosenAnswer({ id: answer.id, isRight: answer.isRight, points: 0 });
              }
            }}
            className={`
              ${index === 0 && "rounded-t-[8px]"}
              ${index === question.answers.length - 1 && "rounded-b-[8px]"}
              bg-gray-100 p-[20px] flex items-start gap-[20px] cursor-pointer
              transition ease-in-out duration-[0.2s] hover:bg-gray-200
            `}
          >
            <input
              type="radio"
              checked={chosenAnswer.id === answer.id}
              onChange={() => {
                if (answer.isRight) {
                  setChosenAnswer({ id: answer.id, isRight: answer.isRight, points: question.points });
                } else {
                  setChosenAnswer({ id: answer.id, isRight: answer.isRight, points: 0 });
                }
              }}
              className="w-[18px] h-[18px] accent-blue-500 cursor-pointer"
            />
            <span>
              {answer.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="pt-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <Button
            onClick={addUserAnswer}
            disabled={chosenAnswer.id === ""}
            className="px-[18px] bg-green-600 font-normal gap-[6px] disabled:bg-gray-400 hover:bg-green-500"
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </Button>
          <div>{timer == 0 && <span>(Time is up)</span>}</div>
        </div>

        <div className="text-[18px]">
          0:{timer > 9 ? <span>{timer}</span> : <span>0{timer}</span>}
        </div>
      </div>
    </li>
  );
};