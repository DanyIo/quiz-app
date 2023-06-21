import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shuffle } from "lodash";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

import { addStats, selectCurrentQuiz } from "../../features/quiz/quizSlice";

export const PlayPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const currentQuiz = useSelector(selectCurrentQuiz);
  const questions = currentQuiz.questions;

  useEffect(() => {
    setShuffledAnswers(
      shuffle([
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ])
    );
  }, [currentQuestion, questions]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      dispatch(
        addStats({
          totalQuestions: questions.length,
          correctAnswers: score,
          totalTimeSpent: timer,
          averageTimePerQuestion: (timer / questions.length).toFixed(2),
          accuracy: ((score / questions.length) * 100).toFixed(2),
        })
      );
      navigate("/finishPage");
    }
  };

  const handleQuizCancel = () => {
    navigate("/");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        height: "100vh",
      }}
    >
      <HeaderStyled>Play Page</HeaderStyled>
      <QuizDivStyled>
        <div style={{ width: "100%", position: "relative" }}>
          <div style={{ marginBottom: "20px" }}>
            <span>Question {currentQuestion + 1}</span>/
            {currentQuiz.numOfQuestions}
          </div>
          <div style={{ marginBottom: "12px" }}>
            {questions[currentQuestion].question}
          </div>
        </div>
        <AnswerSectionStyled>
          {shuffledAnswers.map((answerOption) => (
            <AnswerButtonStyled
              key={answerOption}
              onClick={() =>
                handleAnswerOptionClick(
                  answerOption === questions[currentQuestion].correct_answer
                )
              }
            >
              {answerOption}
            </AnswerButtonStyled>
          ))}
        </AnswerSectionStyled>
      </QuizDivStyled>
      <Typography style={{ marginTop: 35 }}>
        Time: {formatTime(timer)}
      </Typography>{" "}
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuizCancel}
        sx={{
          mt: 9,
          backgroundColor: "black",
          color: "white",
          ":hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Cancel quiz
      </Button>
    </div>
  );
};

const QuizDivStyled = styled(`div`)({
  backgroundColor: "black",
  color: "white",
  width: "45%",
  height: "30%",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "10px 10px 42px 0px rgba(0, 0, 0, 0.75)",
  display: "flex",
  justifyContent: "space-evenly",
});
const AnswerSectionStyled = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const AnswerButtonStyled = styled("button")({
  width: "100%",
  fontSize: "16px",
  color: "#ffffff",
  backgroundColor: "#252d4a",
  borderRadius: "15px",
  display: "flex",
  padding: "5px",
  justifyContent: "flex-start",
  alignItems: "center",
  border: "1px solid white",
  cursor: "pointer",
});
const HeaderStyled = styled(Typography)({
  fontSize: "45px",
  fontWeight: "bold",
  marginBottom: "100px",
});
