import { useContext } from "react";

import { Link } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Container, Button } from "../../components";

import { Trash2, PencilLine } from "lucide-react";
import { toast } from "react-hot-toast";

export const ManageQuizPage = () => {
  const { quizzes, deleteQuiz } = useContext(QuizContext);

  const deleteQuizHandler = async (id: string) => {
    try {
      await deleteQuiz(id);

      toast.success("Successfully deleted Quiz");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="pt-[30px] px-[20px]">
      <Container>
        <h1 className="text-[28px] text-gray-700 font-semibold">Manage your quizzes</h1>

        <ul className="grid grid-cols-3 gap-[20px] mt-[20px]">
          <li
            className="
              h-[200px] bg-gray-100 rounded-[14px] transition
              flex items-center justify-center duration-[0.3s]
              ease-in-out hover:bg-gray-200
            "
          >
            <Link
              to="/adding-quiz"
              className="
                w-full h-full flex items-center justify-center p-[20px]
              "
            >
              <span className="text-[20px] text-blue-400">+ Add quiz</span>
            </Link>
          </li>
          {quizzes.map(quiz => (
            <li
              key={quiz.id}
              className="
                h-[200px] bg-gray-100 rounded-[14px] transition
                flex items-center justify-center relative
              "
            >
              <span className="text-[22px] font-semibold text-blue-400">{quiz.name}</span>
              <div className="absolute top-[5px] right-[5px] flex gap-[8px]">
                <Link to={`/change-quiz/${quiz.id}`}>
                  <Button className="text-gray-600 bg-transparent hover:bg-gray-200">
                    <PencilLine size={18} />
                  </Button>
                </Link>
                <Button
                  className="text-red-400 bg-transparent hover:bg-red-100"
                  onClick={() => deleteQuizHandler(quiz.id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};