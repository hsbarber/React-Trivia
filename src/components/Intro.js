import React from 'react';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import Background from '../img/courthouse.jpg';

const Banner = styled.header`
  background: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ), url(${Background}) 20% 20%;
  background-position: center;
  background-position: cover;
  background-repeat: no-repeat;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    color: white;
    padding: 1rem;
    font-family: 'IM Fell English', serif;
  }
`;
const IntroContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;


`;
const IntroText = styled.div`
  max-width: ${props => props.theme.maxMedium};
  h3 {
    text-align: center;
    font-size: 2rem;
  }
  h4 {
    font-size: 1.75rem;
  }
`;
const UserSignUp = styled.form`
  display: flex;
  justify-content: center;
  button {
    margin-left: 2rem;
  }

`;
const UserInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  font-size: 1.2rem;
  border: 2px solid ${props => props.theme.black};
  border-style:solid;
`;

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 2rem;
    margin-top: 1rem;

  }
  button {
    padding: 1rem 2rem;

    h4{
      padding: 0;
      margin: 0;
    }
  }
`;
const ErrorText = styled.div`
  h4 {
    font-size: 2rem;
  }
`;

  function Intro(props) {
    return (
      <div className="intro">
        <Banner>
          <h2>Travis County History Quiz</h2>
        </Banner>
        <IntroContainer>
          <IntroText>
            <h3>How well do you know the history of Travis County?</h3>
            <h4> This short trivia quiz will test your knowledge. Each question quizzes you
            on a part of Travis County history.
            </h4>
            <h4>
              There are 5 questions to answer and you will be timed once you start the quiz. The more questions
              you get right and the faster you complete the quiz, the higher you will be in the quiz rankings.
            </h4>
            <h4>First, enter a username to begin the quiz. Good luck!</h4>
            {
            props.userAdded ?
              <CSSTransitionGroup
              transitionName="fade"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              <WelcomeText key={props.username}>
                  <h4>Hi {props.username}! begin your game below</h4>
                  <button onClick={() => { props.startQuiz(); props.startTimer(); }}><h4>Start Quiz</h4></button>
                </WelcomeText>
            </CSSTransitionGroup>
            :
            props.userError ?
              <ErrorText>
                <h4>Sorry, that name is already taken. Try a different username.</h4>
                <UserSignUp onSubmit={props.handleAddUser}>
                  <UserInput type="text" name="username" placeholder="What's your name?" onChange={props.handleChange} value={props.username} />
                  <button>Confirm Username</button>
                </UserSignUp>
              </ErrorText>
            :
              <UserSignUp onSubmit={props.handleAddUser}>
                <UserInput type="text" name="username" placeholder="What's your name?" onChange={props.handleChange} value={props.username} />
                <button>Confirm Username</button>
              </UserSignUp>
          }
          </IntroText>
        </IntroContainer>
      </div>
    );
  }


  export default Intro;
