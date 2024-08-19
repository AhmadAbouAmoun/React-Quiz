function Finished({points, maxPossiblePoints, dispatch}) {
    const percentage = (points / maxPossiblePoints) * 100;
    return (
        <>
            <p className="result">
                you scored <strong>{points}</strong> from {maxPossiblePoints} you got {Math.ceil(percentage)}% right
            </p>
            <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>
                Restart
            </button>
        </>
    );
}
export default Finished;
