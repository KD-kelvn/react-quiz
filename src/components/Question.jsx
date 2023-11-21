import { useQuizContext } from "../contexts/QuizContext"
import BtnOptionsGroup from "./BtnOptionsGroup"

const Question = () => {
    const { questions, answer, dispatch, index } = useQuizContext();
    const question = questions[index];
    return (
        <div>
            <h4>{question.question}</h4>
            <BtnOptionsGroup options={question.options} answer={answer} dispatch={dispatch} correct={question.correctOption} />
        </div>
    )
}

export default Question