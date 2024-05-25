import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import QuizContext from "../../context/quiz-context";

import { Input } from "../ui/Input";

import { Search } from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    title: "Main",
    path: "/",
  },
  {
    title: "Quiz management",
    path: "/manage-quiz",
  },
  {
    title: "Add quiz",
    path: "/adding-quiz",
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const { searchQuizzes } = useContext(QuizContext);
  const [search, setSearch] = useState("");

  const submitSearchHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await searchQuizzes(search);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-100 py-[10px] px-[20px]">
      <div
        className="
          w-full m-auto flex justify-between items-center
          lg:w-[1000px]
        "
      >
        <nav>
          <ul className="flex items-center gap-[20px]">
            {NAVIGATION_ITEMS.map(item => (
              <li key={item.title}>
                <Link
                  to={item.path}
                  className="
                    text-blue-400 transition duration-[0.3s] text-[14px]
                    font-medium hover:text-blue-300
                  "
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form onSubmit={submitSearchHandler} className="relative">
          <Input
            placeholder="Search quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white w-[300px] text-[14px] pr-[30px]"
          />
          <div className="text-gray-400 absolute top-[13px] right-[10px]">
            <Search size={18} />
          </div>
        </form>
      </div>
    </header>
  );
};