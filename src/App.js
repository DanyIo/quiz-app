import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { HomePage } from "./pages/HomePage/homePage";
import { PlayPage } from "./pages/PlayPage/playPage";
import { FinishPage } from "./pages/FinishPage/finishPage";
import Loader from "./components/Loader/Loader";

import { fetchCategories, fetchQuizzes } from "./features/quiz/quizSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="quiz-app/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/playPage"
            element={
              <Suspense fallback={<Loader />}>
                <PlayPage />
              </Suspense>
            }
          />
          <Route
            path="/finishPage"
            element={
              <Suspense fallback={<Loader />}>
                <FinishPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
