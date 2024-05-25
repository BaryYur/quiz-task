import React, { useContext, useState } from "react";

import { Quiz } from "../../types";

import QuizContext from "../../context/quiz-context";

import { Input, Button } from "../../components";

import { Check, Loader, Trash2, X } from "lucide-react";

import { toast } from "react-hot-toast";

import { v4 as uuidv4 } from "uuid";

type QuizFormProps = {
  quiz: Quiz | null;
};

export const QuizForm: React.FC<QuizFormProps> = ({ quiz}) => {
  const questionId = uuidv4();
  const { addQuiz, changeQuiz } = useContext(QuizContext);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(
    quiz ? quiz.questions : [{
      id: questionId,
      name: "question-1",
      title: "",
      points: 0,
      answers: [
        {
          id: uuidv4(),
          text: "",
          name: "question-1-answer-1",
          isRight: true,
        },
        {
          id: uuidv4(),
          text: "",
          name: "question-1-answer-2",
          isRight: false,
        },
        {
          id: uuidv4(),
          text: "",
          name: "question-1-answer-3",
          isRight: false,
        },
        {
          id: uuidv4(),
          text: "",
          name: "question-1-answer-4",
          isRight: false,
        },
      ],
    }]
  );
  const [quizName, setQuizName] = useState(quiz ? quiz.name : "");

  const addQuestionHandler = () => {
    setQuestions(prevQuestions =>
      [
        ...prevQuestions,
        {
          id: uuidv4(),
          name: `question-${questions.length + 1}`,
          title: "",
          points: 0,
          answers: [
            {
              id: uuidv4(),
              text: "",
              name: `question-${questions.length + 1}-answer-1`,
              isRight: true,
            },
            {
              id: uuidv4(),
              text: "",
              name: `question-${questions.length + 1}-answer-2`,
              isRight: false,
            },
            {
              id: uuidv4(),
              text: "",
              name: `question-${questions.length + 1}-answer-3`,
              isRight: false,
            },
            {
              id: uuidv4(),
              text: "",
              name: `question-${questions.length + 1}-answer-4`,
              isRight: false,
            },
          ],
        }
      ]
    );
  };

  const removeQuestionHandler = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const questionTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id ? { ...question, title: event.target.value } : question
      )
    );
  };

  const questionPointsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id ? { ...question, points: Number(event.target.value) } : question
      )
    );
  };

  const answerTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>, questionId: string, answerId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId
          ? {
            ...question,
            answers: question.answers.map(answer =>
              answer.id === answerId ? { ...answer, text: event.target.value } : answer
            ),
          }
          : question
      )
    );
  };

  const choseAnswerHandler = (questionId: string, answerId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId
          ? {
            ...question,
            answers: question.answers.map(answer =>
              answer.id === answerId ? { ...answer, isRight: true } : { ...answer, isRight: false }
            ),
          }
          : question
      )
    );
  };

  const removeAnswerHandler = (questionId: string, answerId: string, isChecked: boolean) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId
          ? {
            ...question,
            answers: question.answers
              .filter(answer => answer.id !== answerId)
              .map((answer, index) =>
                index === 0 && isChecked ? { ...answer, isRight: true } : answer
              ),
          }
          : question
      )
    );
  };

  const addAnswerHandler = (questionId: string) => {
    const newAnswer = {
      id: uuidv4(),
      text: "",
      name: `question-${questions.length + 1}-answer-${Date.now()}`,
      isRight: false,
    };

    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId
          ? {
            ...question,
            answers: [...question.answers, newAnswer],
          }
          : question
      )
    );
  };

  const addQuizHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (quizName.trim() === "") {
      toast.error("Quiz name cannot be empty.");
      return;
    }

    for (const question of questions) {
      if (question.title.trim() === "") {
        toast.error("All questions must have a title.");
        return;
      }

      for (const answer of question.answers) {
        if (answer.text.trim() === "") {
          toast.error("All answers must have text.");
          return;
        }
      }
    }

    const quizData = {
      id: quiz ? quiz.id : uuidv4(),
      name: quizName.trim(),
      questions,
    };

    if (quiz === null) {
      setLoading(true);

      try {
        await addQuiz(quizData);

        toast.success("Successfully added");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);

      try {
        await changeQuiz(quiz.id, quizData);

        toast.success("Successfully changed");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={addQuizHandler} className="pt-[20px]">
        <div className="flex flex-col w-[300px]">
          <label htmlFor="quiz-name">Quiz name</label>
          <Input
            id="quiz-name"
            className="mt-[6px]"
            name="quiz-name"
            value={quizName}
            onChange={(event) => setQuizName(event.target.value)}
          />
        </div>

        <ul>
          {questions.map((question, index) => (
            <li
              key={question.id}
              className="flex justify-between items-start pt-[10px]"
            >
              <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between items-start gap-[10px]">
                  <div className="flex items-start gap-[10px]">
                    <div className="flex flex-col gap-[6px]">
                      <label htmlFor={question.name}>{index + 1}. Question title</label>
                      <Input
                        id={question.name}
                        name={question.name}
                        value={question.title}
                        onChange={(event) => questionTitleChangeHandler(event, question.id)}
                        className="w-[300px]"
                      />
                    </div>

                    <div className="flex flex-col gap-[6px]">
                      <label htmlFor={`${question.name}-points`}>Points</label>
                      <Input
                        id={`${question.name}-points`}
                        name={question.name}
                        value={question.points}
                        min={0}
                        type="number"
                        onChange={(event) => questionPointsChangeHandler(event, question.id)}
                        className="w-[100px]"
                      />
                    </div>
                  </div>

                  {index !== 0 &&
                    <Button
                      className="
                          bg-red-400 text-white
                          flex gap-[5px] items-center hover:bg-red-300
                        "
                      onClick={() => removeQuestionHandler(question.id)}
                    >
                      <Trash2 size={18}/>
                      <span>Remove</span>
                    </Button>
                  }
                </div>

                <ul className="grid grid-cols-2 gap-[10px] relative">
                  <li className="absolute right-[-120px] top-0">
                    <button
                      type="button"
                      onClick={() => addAnswerHandler(question.id)}
                      className="text-blue-400"
                    >
                      + Add answer
                    </button>
                  </li>
                  {question.answers.map((answer, index) => (
                    <li key={answer.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items center gap-[10px]">
                          <button
                            type="button"
                            onClick={() => choseAnswerHandler(question.id, answer.id)}
                            className={`
                              ${answer.isRight ? "bg-blue-400 text-white border-white" : "bg-gray-100"}
                              w-[22px] h-[22px] border-[1px] flex items-center justify-center
                              rounded-full
                            `}
                          >
                            {answer.isRight && <Check size={17}/>}
                          </button>
                          <span>Right answer</span>
                        </div>

                        {index !== 0 && index !== 1 &&
                          <button
                            type="button"
                            className="text-red-400"
                            onClick={() => removeAnswerHandler(question.id, answer.id, answer.isRight)}
                          >
                            <X size={18} />
                          </button>
                        }
                      </div>
                      <textarea
                        name={answer.name}
                        value={answer.text}
                        placeholder="Enter answer"
                        onChange={(event) => answerTextHandler(event, question.id, answer.id)}
                        className="
                            px-[15px] py-[10px] rounded-[10px] w-[300px] min-h-[120px] bg-gray-100 border-transparent
                            border-[2px] transition ease-in-out mt-[10px] placeholder:text-gray-400
                            focus:border-[2px] focus:border-blue-400
                          "
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addQuestionHandler}
          className="mt-[20px] text-blue-400"
        >
          + Add new question
        </button>

        <div className="flex justify-end mt-[20px]">
          <Button
            type="submit"
            className="
              bg-gray-800 px-[14px] py-[10px] rounded-[8px] text-white
              w-[130px] h-[40px] hover:bg-gray-700
            "
          >
            {!loading && (quiz ? <span>Save changes</span> : <span>Add quiz</span>)}
            {loading && <Loader size={18} className="animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
};