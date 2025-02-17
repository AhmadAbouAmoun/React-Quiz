function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h3>Welcome to the react quiz!!</h3>
            <h3>{numQuestions} questions to test your React Mastery</h3>
            <button onClick={() => dispatch({type: "start"})} className="btn btn-ui">
                Let's start
            </button>
        </div>
    );
}
export default StartScreen;
