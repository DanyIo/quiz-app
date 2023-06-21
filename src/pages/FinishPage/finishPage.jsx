import { useSelector } from "react-redux";
import { Typography, Box, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Button, styled } from "@mui/material";

import { selectStats } from "../../features/quiz/quizSlice";

export const FinishPage = () => {
  const navigate = useNavigate();

  const stats = useSelector(selectStats);

  const progressPercentage = (
    (stats.correctAnswers / stats.totalQuestions) *
    100
  ).toFixed(2);

  console.log(stats);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
      }}
    >
      <HeaderStyled>Finish Page</HeaderStyled>

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "black",
          borderRadius: 4,
          width: "40%",
          "@media (max-width: 768px)": {
            width: "60%",
          },
        }}
      >
        <Typography variant="h6">Your stats</Typography>
        <Typography>
          Accuracy: {stats.accuracy}% ({stats.correctAnswers}/
          {stats.totalQuestions})
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{ my: 1, color: "white" }}
        />
        <Typography>
          Average Time per Question: {stats.averageTimePerQuestion}s
        </Typography>
        <Typography>Total Time Spent: {stats.totalTimeSpent}s</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/");
        }}
        sx={{
          mt: 9,
          backgroundColor: "black",
          color: "white",
          ":hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Home Page
      </Button>
    </div>
  );
};
const HeaderStyled = styled(Typography)({
  fontSize: "45px",
  fontWeight: "bold",
  marginBottom: "100px",
  color: "black",
});
