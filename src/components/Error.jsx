import { useQuizContext } from "../contexts/QuizContext";

function Error() {
  const { errorMessage } = useQuizContext();
  return (
    <p className="error">
      <span>💥</span> {
        errorMessage
      }
    </p>
  );
}

export default Error;
