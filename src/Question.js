import Options from "./components/Options";
function Question({question, dispatch, answer}) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}></Options>
        </div>
    );
}
export default Question;
