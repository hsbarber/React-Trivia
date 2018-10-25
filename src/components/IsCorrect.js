import React from 'react';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import ms from 'pretty-ms';

const Answered = styled.section`
  padding: 1rem;
  p {
    font-size: 1.75rem;
  }
`;
const IsCorrectAnswer = styled.h2`
  margin-top: 0;
  span {
    text-decoration: underline;
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
function IsCorrect(props) {
	// if (props.correctAnswer === 'true') {
	// 	return (
  // <div className="answered">
  //   <h2 className="isCorrect">That answer is {props.correctAnswer}</h2>
  //   <p className="explanation">{props.explanation}</p>
  //   <button type="button" onClick={props.nextButton}><h3>Next Question</h3></button>
  // </div>
  //     );
  //   }

	    return (
  <CSSTransitionGroup
    transitionName="up"
    // transitionAppear
    // transitionAppearTimeout={300}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
  >
    <Answered key={props.questionId}>
      <IsCorrectAnswer>That answer is <span>{props.correctAnswer}</span></IsCorrectAnswer>
      <p> The correct answer: <b>{props.correct}</b></p>
      <p className="explanation">{props.explanation}</p>
      {props.questionId === 5 ? <button type="button" onClick={() => { props.nextButton(); props.stopTimer(); }}><h3>Next Question</h3></button> :
      <button type="button" onClick={props.nextButton}><h3>Next Question</h3></button>}
    </Answered>
  </CSSTransitionGroup>
	    );
}


 export default IsCorrect;
