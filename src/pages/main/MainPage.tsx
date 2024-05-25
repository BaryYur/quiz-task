import { useContext } from "react";

import { Link } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Container } from "../../components";

export const MainPage = () => {
  const { quizzes, searchingLoading } = useContext(QuizContext);

  return (
    <div className="pt-[30px] px-[20px]">
      <Container>
        <h1 className="text-[28px] text-gray-700 font-semibold">Choose a quiz</h1>

        {searchingLoading && <p>Loading...</p>}

        <ul className="grid grid-cols-3 gap-[20px] mt-[20px]">
          {!searchingLoading && quizzes.map(quiz => (
            <li
              key={quiz.id}
              className="
                h-[200px] bg-gray-100 rounded-[14px] transition
                duration-[0.3s] ease-in-out hover:bg-gray-200
              "
            >
              <Link
                to={`/quiz/${quiz.id}`}
                className="
                  w-full h-full flex items-center justify-center p-[20px]
                "
              >
                <span className="text-[22px] font-semibold text-blue-400">{quiz.name}</span>
                {/*<span>Start quiz</span>*/}
              </Link>
            </li>
          ))}
        </ul>

        {quizzes.length === 0 && !searchingLoading &&
          <p className="text-gray-500 text-center font-semibold mt-[100px]">No quizzes</p>
        }
      </Container>
    </div>
  );
};