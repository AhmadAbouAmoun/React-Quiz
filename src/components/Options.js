function Options({question, dispatch, answer}) {
    const answered = answer !== null;
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    onClick={() => dispatch({type: "newAnswer", payload: index})}
                    className={`btn btn-option ${index === answer ? "answer" : ""} ${
                        answered ? (index === question.correctOption ? "correct" : "wrong") : ""
                    }`}
                    disabled={answered}
                    key={option}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
export default Options;
