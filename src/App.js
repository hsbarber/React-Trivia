import React, { Component } from 'react';
import update from 'react-addons-update';
import firebase from './firebase.js';
import { ThemeProvider, injectGlobal } from 'styled-components';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Intro from './components/Intro';
import './App.css';
import './index.css';

const theme = {
  accent: 'rgb(78, 2, 255)',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxMedium: '800px',
  maxLarge: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

injectGlobal`
    html {
        box-sizing: border-box;
        font-size: 10px;

    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'Crimson Text', serif;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
    h1, h2, h3, h4 {
      color: ${theme.black};
    }
    h4 {
      font-size: 2rem;

    }
    .row {
      display: flex;
    }
    button {
      background: transparent;
      border-radius: 3px;
      border: 2px solid ${theme.black};
      color: ${theme.black};
      padding: 0.25rem 1rem;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        color: white;
        background: ${theme.black};
        box-shadow: ${theme.bs};
        h3, h4 {
          color: white;
        }
      }
    }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      username: '',
      authUser: '',
      error: '',
      userError: false,
      userAdded: false,
      quizStart: 0,
      counter: 0,
      questionId: 1,
      question: '',
      explanation: '',
      correct: '',
      answerOptions: [],
      checked: '',
      answerResult: '',
      answersCount: {
        true: 0,
        false: 0,
      },
      result: '',
      time: 0,
      finalTime: 0,
      isOn: false,
      start: 0,
    };
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.retryQuiz = this.retryQuiz.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    // this.renderIntro = this.renderIntro.bind(this);
  }
componentDidMount() {
  const shuffledAnswerOptions = quizQuestions.map(question =>
    this.shuffleArray(question.answers));
  this.setState({
    question: quizQuestions[0].question,
    answerOptions: shuffledAnswerOptions[0],
    explanation: quizQuestions[0].explanation,
    correct: quizQuestions[0].correct,
  });
  const usersRef = firebase.database().ref('users');
	    usersRef.on('value', (snapshot) => {
	      const users = snapshot.val();
			  const newState = [];
			  // console.log(recipesRef);
	      for (const user in users) {
          newState.push({
          id: user,
          user: users[user].user,
          answersCount: users[user].answersCount,
          time: users[user].time,
          });
	      }
			this.setState({
				users: newState,
      });
    });
     window.scrollTo(0, 0);
}
// FUNCTIONS FOR TIMER
startTimer() {
  this.setState({
    isOn: true,
    time: this.state.time,
    start: Date.now() - this.state.time,
  });
  this.timer = setInterval(() => this.setState({
    time: Date.now() - this.state.start,
  }), 1);
}
stopTimer() {
  this.setState({
    isOn: false,
    finalTime: this.state.time,
  });
  clearInterval(this.timer);
  const findID = this.state.users
    .filter((user) => {
      if (user.user === this.state.username) {
        return user.id;
      }
    });
  const id = findID[0].id;
  return firebase.database().ref(`/users/${id}`).update(
    {
      time: this.state.time,
    },
  );
}
resetTimer() {
  this.setState({ time: 0, isOn: false });
}
setUserAnswer(value, name) {
  // const id = this.state.users.filter(user => user.id)
  const updatedAnswersCount = update(this.state.answersCount, {
      [name]: { $apply: currentValue => currentValue + 1 },
    });
  this.setState({
    answersCount: updatedAnswersCount,
    answerResult: name,
    checked: value,
  });
  const findID = this.state.users
    .filter((user) => {
      if (user.user === this.state.username) {
        return user.id;
      }
    });
  const id = findID[0].id;
  return firebase.database().ref(`/users/${id}`).update(
    {
      answersCount: updatedAnswersCount,
    },
  );
}
setNextQuestion() {
  if (this.state.questionId < quizQuestions.length) {
     const counter = this.state.counter + 1;
     const questionId = this.state.questionId + 1;
     this.setState({
       counter,
       questionId,
       question: quizQuestions[counter].question,
       answerOptions: quizQuestions[counter].answers,
       explanation: quizQuestions[counter].explanation,
       correct: quizQuestions[counter].correct,
       checked: '',
       answerResult: '',
    });
  } else {
    this.setResults(this.getResults());
  }
}
getResults() {
  const answersCount = this.state.answersCount;
  const answersCountKeys = Object.keys(answersCount);
  const answersCountValues = answersCountKeys.map(key => answersCount[key]);

  return answersCountValues;
}
setResults(result) {
  this.setState({ result });
}
handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
}
handleAddUser(e) {
  e.preventDefault();
  const usersRef = firebase.database().ref('users');

  const user = {
    user: this.state.username,
    answersCount: {},
  };
  const username = this.state.username;
  firebase.auth().signInAnonymously()
    .then((authUser) => {
      this.setState({ authUser });
    })
    .then(() => {
      usersRef.orderByChild('user').equalTo(username.toLowerCase()).once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log(userData);
          this.setState({ userError: true });
        } else {
          this.setState({ userError: false });
          usersRef.push(user);
          this.setState({ userAdded: true });
        }
      });
    })
    .catch((error) => {
      this.setState({ error });
    });
}
shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}
handleAnswerSelected(event) {
  this.setUserAnswer(event.currentTarget.value, event.currentTarget.name);
  console.log(event.currentTarget.value, event.currentTarget.name);
}
startQuiz() {
  const quizStart = this.state.quizStart + 1;
  this.setState({
       quizStart,
  });
}
retryQuiz() {
  this.setState({
       quizStart: 0,
  });
}
renderQuiz() {
  if (this.state.quizStart === 1) {
    return (
      <Quiz
        checked={this.state.checked}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        validateAnswers={this.setNextQuestion}
        result={this.state.answerResult}
        exp={this.state.explanation}
        correct={this.state.correct}
        time={this.state.time}
        stopTimer={this.stopTimer}
        finalTime={this.state.finalTime}
      />
    );
  }
  // return (
  //   <Quiz
  //     checked={this.state.checked}
  //     answerOptions={this.state.answerOptions}
  //     questionId={this.state.questionId}
  //     question={this.state.question}
  //     questionTotal={quizQuestions.length}
  //     onAnswerSelected={this.handleAnswerSelected}
  //     validateAnswers={this.setNextQuestion}
  //     result={this.state.answerResult}
  //     exp={this.state.explanation}
  //     correct={this.state.correct}
  //     time={this.state.time}
  //     stopTimer={this.stopTimer}
  //     finalTime={this.state.finalTime}
  //   />
  // );
    return (
      <Intro
        startQuiz={this.startQuiz}
        startTimer={this.startTimer}
        handleAddUser={this.handleAddUser}
        handleChange={this.handleChange}
        username={this.state.username}
        userAdded={this.state.userAdded}
        userError={this.state.userError}
      />
    );
}
renderResult() {
  return (
    <Result quizResult={this.state.result} retryQuiz={this.startQuiz} users={this.state.users} finalTime={this.state.finalTime} />
  );
}
render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <div className="container">
            {this.state.result ? this.renderResult() : this.renderQuiz() }
            {/* {this.renderResult() } */}
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
export default App;
