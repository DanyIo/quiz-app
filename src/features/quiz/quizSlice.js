import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  quizzes: [],
  categories: [],
  currentQuiz: [],
  stats: {},
  status: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;
      return categories;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async () => {
  const quizzes = [];
  const numOfQuizzes = 10;
  const usedCategories = [];

  for (let i = 0; i < numOfQuizzes; i++) {
    const categoryId = generateRandomNumber(9, 32, usedCategories);
    usedCategories.push(categoryId);

    const response = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}`
    );
    const quizQuestions = response.data.results;

    const quiz = {
      categoryId: `${categoryId}`,
      numOfQuestions: quizQuestions.length,
      questions: quizQuestions,
    };
    quizzes.push(quiz);
  }
  return quizzes;
});

function generateRandomNumber(min, max, usedCategories) {
  let categoryId;
  do {
    categoryId = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (usedCategories.includes(categoryId));

  return categoryId;
}

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = state.quizzes[action.payload];
    },
    addStats: (state, actions) => {
      state.stats = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setCurrentQuiz, addStats } = quizSlice.actions;

export const selectQuizzes = (state) => state.quiz.quizzes;

export const selectCategories = (state) => state.quiz.categories;

export const selectStatus = (state) => state.quiz.status;

export const selectCurrentQuiz = (state) => state.quiz.currentQuiz;

export const selectStats = (state) => state.quiz.stats;

export default quizSlice.reducer;
