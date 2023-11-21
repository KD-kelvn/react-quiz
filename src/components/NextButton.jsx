import { useQuizContext } from "../contexts/QuizContext"

const NextButton = () => {
    const { index, lastQn, dispatch, answer } = useQuizContext();
    return (
        <>
            {
                index < lastQn - 1 && (<button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "NEXT_QN" })}
                    disabled={answer === null}
                >
                    Next
                </button>)
            }

            {
                index === lastQn && (
                    <button
                        className="btn btn-ui"
                        onClick={() => dispatch({ type: "FINISH" })}
                    >
                        Finish
                    </button>
                )
            }

            {
                answer === null && null
            }
        </>
    )
}

export default NextButton