import {act, useEffect, useReducer} from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Finished from "./Finished";
import Progress from "./Progress";
const intitialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
};
function reducer(state, action) {
    switch (action.type) {
        case "start":
            return {...state, status: "active"};
        case "dataRecieved":
            return {...state, questions: action.payload, status: "ready"};
        case "dataFailed":
            return {...state, status: "error"};
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points: question.correctOption === action.payload ? state.points + question.points : state.points,
            };
        case "nextQuestion": {
            return {...state, index: state.index + 1, answer: null};
        }
        case "finished": {
            return {...state, status: "finished"};
        }
        case "restart": {
            return {...state, index: 0, answer: null, points: 0, status: "ready"};
        }
        default:
            throw new Error("Action is unknown");
    }
}
export default function App() {
    const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, intitialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);
    useEffect(function () {
        fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({type: "dataRecieved", payload: data}))
        .catch((err) => dispatch({type: "dataFailed"}));
    }, []);
    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                        />
                        <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
                    </>
                )}
                {status === "finished" && (
                    <Finished points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} />
                )}
            </Main>
        </div>
    );
}
