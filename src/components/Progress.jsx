import { useQuizContext } from "../contexts/QuizContext"

const Progress = () => {
    const { totalQns, index, answer, points, maxPossiblePoints } = useQuizContext();
    return (
        <header className="progress">
            <progress max={totalQns} value={index + Number(answer !== null)} />
            <p>
                Question <strong>{index + 1}</strong> / {totalQns}
            </p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}

export default Progress