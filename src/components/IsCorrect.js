import React from 'react';
import styled from 'styled-components';

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

function IsCorrect(props) {
	    return (
  <Answered key={props.questionId}>
          <IsCorrectAnswer>That answer is <span>{props.correctAnswer}</span></IsCorrectAnswer>
          <p> The correct answer: <b>{props.correct}</b></p>
          <p className="explanation">{props.explanation}</p>
          {props.questionId === 5 ? <button type="button" onClick={() => { props.nextButton(); props.stopTimer(); }}><h3>Next Question</h3></button> :
          <button type="button" onClick={props.nextButton}><h3>Next Question</h3></button>}
        </Answered>
	    );
}


 export default IsCorrect;
