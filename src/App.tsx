import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

//Components
import QuestionCard from "./components/QuestionCard";

//Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User Answers
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const startButtonSection =
    gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
    ) : null;

  const scoreSection = !gameOver && !loading && (
    <p className="score">Score: {score}</p>
  );

  const loadingSection = loading && <p>Loading Questions...</p>;

  const questionSection = !loading && !gameOver && (
    <QuestionCard
      questionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers && userAnswers[number]}
      callback={checkAnswer}
    />
  );

  const nextQuestionButton = !loading &&
    !gameOver &&
    number !== TOTAL_QUESTIONS - 1 &&
    userAnswers.length === number + 1 && (
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    );

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {startButtonSection}
        {scoreSection}
        {loadingSection}
        {questionSection}
        {nextQuestionButton}
      </Wrapper>
    </>
  );
};

export default App;
