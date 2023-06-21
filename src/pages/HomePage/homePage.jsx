import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

import Loader from "../../components/Loader/Loader";
import {
  selectQuizzes,
  selectCategories,
  selectStatus,
  setCurrentQuiz,
} from "../../features/quiz/quizSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector(selectQuizzes);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectStatus);

  function getCategoryNameByID(id) {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : `Not such category`;
  }

  const handlePickRandomQuiz = () => {
    const randomQuizIndex = Math.floor(Math.random() * quizzes.length);
    dispatch(setCurrentQuiz(randomQuizIndex));
    navigate("/playPage");
  };

  const handlePlayQuiz = (quizId) => {
    dispatch(setCurrentQuiz(quizId));
    navigate("/playPage");
  };
  console.log(quizzes);
  return (
    <>
      {status === "idle" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2%",
          }}
        >
          <HeaderStyled>Home Page</HeaderStyled>

          {quizzes.map((item, index) => (
            <QuizDivStyled key={index}>
              <Typography variant="h6">
                Category: {getCategoryNameByID(parseInt(item.categoryId))}
              </Typography>
              <Typography variant="body1">
                Question: {item.questions.length}
              </Typography>
              <PlayButtonStyled
                onClick={() => {
                  handlePlayQuiz(index);
                }}
              >
                Play
              </PlayButtonStyled>
            </QuizDivStyled>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePickRandomQuiz}
            sx={{
              mt: 5,
              mb: 5,
              backgroundColor: "black",
              color: "white",
              ":hover": {
                backgroundColor: "gray",
              },
            }}
          >
            I'm lucky
          </Button>
        </div>
      ) : (
        <CenterLoader>
          <Loader />
        </CenterLoader>
      )}
    </>
  );
};

const HeaderStyled = styled(Typography)({
  fontSize: "45px",
  fontWeight: "bold",
  marginBottom: "40px",
});

const QuizDivStyled = styled(`div`)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  background: "black",
  color: "white",
  padding: "10px",
  width: "30%",
  marginBottom: "10px",
  borderRadius: "4px",
  "@media (max-width: 768px)": {
    width: "60%",
  },
});

const PlayButtonStyled = styled(Button)({
  backgroundColor: "#ff4081",
  color: "white",
  fontWeight: "bold",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: "#f50057",
  },
});
const CenterLoader = styled(`div`)({
  position: "absolute",
  top: "50%",
  left: "47%",
  margin: "-25px 0 0 -25px",
});
