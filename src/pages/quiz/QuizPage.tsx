import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Container } from "../../components";
import { QuestionItem } from "./QuestionItem";
import { QuizResults } from "./QuizResults";

export const QuizPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { quizzes, getCurrentQuiz, currentQuiz, userQuizzes } = useContext(QuizContext);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const checkQuizId = () => {
    const ids = quizzes.map((quiz) => quiz.id);

    if (params.id) {
      if (!ids.includes(params.id)) navigate("/");
    }
  };

  const getCurrentQuestionNumber = () => {
    if (params.id) {
      for (const item of userQuizzes) {
        if (item.quizId === params.id) {
          setCurrentQuestionNumber(item.currentQuestionNumber);
        }
      }
    }
  };

  const getNextQuestion = () => {
    if (params.id) {
      for (const item of userQuizzes) {
        if (item.quizId === params.id) {
          item.currentQuestionNumber = item.currentQuestionNumber + 1;
        }
      }

      setCurrentQuestionNumber(number => number + 1);
      localStorage.setItem("userQuizzes", JSON.stringify(userQuizzes));
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      checkQuizId();

      if (params.id) {
        try {
          await getCurrentQuiz(params.id);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuiz();
  }, [params, quizzes]);

  useEffect(() => {
    getCurrentQuestionNumber();
  }, []);

  if (loading) return <p className="text-center mt-[30px]">Loading...</p>;

  return (
    <Container>
      {currentQuiz && <div className="pt-[30px] pb-[50px]">
        <h1 className="text-[28px] text-gray-700 font-semibold">
          {currentQuiz.name}
        </h1>
        {currentQuestionNumber <= currentQuiz.questions.length &&
          <p className="text-[18px] mt-[8px] font-semibold">
            Question {currentQuestionNumber} of {currentQuiz.questions.length}:
          </p>
        }

        {currentQuestionNumber <= currentQuiz.questions.length ? (
          <ul className="w-[800px]">
            {currentQuiz.questions.map((question, index) => {
              return (
                currentQuestionNumber - 1 === index && <QuestionItem
                  key={question.id}
                  question={question}
                  quizId={params.id ?? ""}
                  getNextQuestion={getNextQuestion}
                />
              )
            })}
          </ul>
          ) : (
          <QuizResults quizId={params.id ?? ""} currentQuiz={currentQuiz} />
        )}
      </div>}
    </Container>
  );
};