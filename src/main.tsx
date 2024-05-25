import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

import { QuizContextProvider } from "./context/quiz-context";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizContextProvider>
        <App />
      </QuizContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
