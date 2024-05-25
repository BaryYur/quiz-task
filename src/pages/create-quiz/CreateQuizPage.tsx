import { Container, QuizForm } from "../../components";

export const CreateQuizPage = () => {
  return (
    <Container>
      <div className="pt-[30px] pb-[50px] w-[610px]">
        <h1 className="text-[28px] text-gray-700 font-semibold">Create quiz</h1>

        <QuizForm quiz={null} />
      </div>
    </Container>
  );
};