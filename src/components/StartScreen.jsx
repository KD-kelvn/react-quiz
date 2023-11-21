import { useQuizContext } from "../contexts/QuizContext";

const StartScreen = ({

}) => {
  const { totalQns, dispatch } = useQuizContext()
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{totalQns} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START" })}

      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
