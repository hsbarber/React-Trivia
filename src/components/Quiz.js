import React, { Component } from 'react';
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
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
  }
  componentDidMount() { window.scrollTo(0, 0); }
  renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.value}
        answerContent={key.value}
        answerNumber={key.no}
        answer={key.answer}
        checked={this.props.checked}
        questionId={this.props.questionId}
        onAnswerSelected={this.props.onAnswerSelected}
      />
    );
  }
   correctAnswer() {
    if (this.props.checked) {
      return (
        <IsCorrect
          correctAnswer={this.props.result}
          correct={this.props.correct}
          explanation={this.props.exp}
          nextButton={this.props.validateAnswers}
          questionId={this.props.questionId}
          stopTimer={this.props.stopTimer}
        />
      );
     }
  }
  render() {
    return (

      <QuestionContainer >
        <Timer><h3>timer: <span>{ms(this.props.time, { compact: true })}</span></h3></Timer>
        {this.props.checked ? this.correctAnswer() :
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div key={this.props.questionId}>
            <QuestionCount
                counter={this.props.questionId}
                total={this.props.questionTotal}
              />
            <Question content={this.props.question} />
            <AnswerOptions>
                {this.props.answerOptions.map(this.renderAnswerOptions)}
              </AnswerOptions>
          </div>
        </CSSTransitionGroup>
          }
      </QuestionContainer>

    );
  }
}


export default Quiz;
