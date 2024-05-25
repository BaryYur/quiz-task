import { Routes, Route } from "react-router-dom";

import {
  MainPage,
  CreateQuizPage,
  NotFoundPage,
  ManageQuizPage,
  QuizPage,
  ChangeQuizPage,
} from "./pages";
import { Header } from "./components";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/adding-quiz" element={<CreateQuizPage />} />
        <Route path="/manage-quiz" element={<ManageQuizPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/change-quiz/:id" element={<ChangeQuizPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;