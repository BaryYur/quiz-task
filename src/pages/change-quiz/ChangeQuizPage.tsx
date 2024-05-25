import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Container, QuizForm } from "../../components";

export const ChangeQuizPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { currentQuiz, getCurrentQuiz, quizzes } = useContext(QuizContext);
  const [loading, setLoading] = useState(true);

  const checkQuizId = () => {
    const ids = quizzes.map((quiz) => quiz.id);

    if (params.id) {
      if (!ids.includes(params.id)) navigate("/");
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
  }, [params.id, quizzes]);

  if (!currentQuiz || loading) {
    return (
      <Container>
        <div className="pt-[30px] pb-[50px] w-[610px]">
          <p className="text-gray-700">Loading quiz...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-[30px] pb-[50px] w-[610px]">
        <h1 className="text-[28px] text-gray-700 font-semibold">Changing quiz</h1>
        <QuizForm quiz={currentQuiz} />
      </div>
    </Container>
  );
};