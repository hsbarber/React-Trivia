import React from 'react';
import styled from 'styled-components';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import IsCorrect from '../components/IsCorrect';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import ms from 'pretty-ms';

const QuestionContainer = styled.div`
  margin: 4rem auto;
  padding: 2rem;
  /* position: fixed; */

  @media (min-width: 600px) {
    width: 70%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;
const Timer = styled.div`
  display: flex;
  justify-content: flex-end;
  h3 {
    font-size: 2.2rem;
    border: 2px solid ${props => props.theme.black};
    padding: 1.5rem;
  }

`;
const AnswerOptions = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
`;
function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.value}
        answerContent={key.value}
        answerNumber={key.no}
        answer={key.answer}
        checked={props.checked}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  function correctAnswer() {
    if (props.checked) {
      return (
        <IsCorrect
          correctAnswer={props.result}
          correct={props.correct}
          explanation={props.exp}
          nextButton={props.validateAnswers}
          questionId={props.questionId}
          stopTimer={props.stopTimer}
        />
      );
     }
  }
  return (

    <QuestionContainer >
      <Timer><h3>timer: <span>{ms(props.time, { compact: true })}</span></h3></Timer>
      {props.checked ? correctAnswer() :
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div key={props.questionId}>
            <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
          />
            <Question content={props.question} />
            <AnswerOptions>
            {props.answerOptions.map(renderAnswerOptions)}
          </AnswerOptions>
          </div>
        </CSSTransitionGroup>
        }
    </QuestionContainer>

  );
}


export default Quiz;
