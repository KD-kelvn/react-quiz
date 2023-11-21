

const BtnOptionsGroup = ({
    options = [],
    answer,
    dispatch,
    correct
}) => {
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {
                options.map((opt, index) => (
                    <button key={opt} className={`btn btn-option ${answer === index ? "answer" : ""} ${hasAnswered ? index === correct ? "correct" : "wrong" : ""} `}
                        onClick={() => {
                            dispatch({ type: "NEW_ANSWER", payload: index })
                        }}
                        disabled={hasAnswered}
                    >
                        {opt}
                    </button>
                ))
            }
        </div>
    )
}

export default BtnOptionsGroup