import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";


const Timer = () => {
    const { dispatch, secsRemaining } = useQuizContext();
    useEffect(() => {
        function reduceSecsRemaining() {
            dispatch({ type: "TICK" })
        }
        const id = setInterval(reduceSecsRemaining, 1000)
        function clean() {
            clearInterval(id)
        }
        return clean
    }, [dispatch])
    const min = Math.floor(secsRemaining / 60);
    const seconds = secsRemaining % 60;

    return (
        <div className="timer">
            {min < 10 && "0"}
            {min}:{seconds < 10 && "0"}
            {seconds}
        </div>
    )
}

export default Timer