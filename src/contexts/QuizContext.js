import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  //loading, error,  ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secsRemaining: null,
  highscore: 0,
  errorMessage: null,
};

const SECS_PER_QN = 60;

function reducer(state, action) {
  switch (action.type) {
    case "RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "FAILED":
      return {
        ...state,
        status: "error",
        errorMessage: "There was an error fetching questions please try again",
      };

    case "START":
      return {
        ...state,
        status: "active",
        secsRemaining: state.questions.length + SECS_PER_QN,
      };
    case "TICK":
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        status: state.secsRemaining === 0 ? "finished" : state.status,
      };
    case "NEXT_QN":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "NEW_ANSWER":
      const qn = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === qn.correctOption
            ? state.points + qn.points
            : state.points,
      };
    case "FINISH":
      return {
        ...state,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        status: "finished",
      };
    case "RESTART":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    default:
      return {
        ...state,
        status: "error",
        errorMessage: "Unknown action found",
      };
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      secsRemaining,
      points,
      highscore,
      errorMessage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQns = questions.length;
  const lastQn = questions.length - 1;
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:5000/questions", {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "RECEIVED", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "FAILED", payload: err });
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const maxPossiblePoints = questions.reduce(function (prev, curr) {
    return prev + curr.points;
  }, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        totalQns,
        lastQn,
        status,
        index,
        answer,
        secsRemaining,
        points,
        highscore,
        errorMessage,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Unknown context from quiz context");

  return context;
}

export { QuizProvider, useQuizContext };
