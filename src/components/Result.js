import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ms from 'pretty-ms';
import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;



`;
const TopResults = styled.h2`
    padding: 0 4rem;
    text-align: center;
    strong {
      font-weight: bold;
      text-decoration: underline;
    }
    a {
      color: ${props => props.theme.accent};
      text-decoration: underline;
    }
`;

const Rankings = styled.div`

  border-right: 1px solid ${props => props.theme.grey};
  max-width: 800px;
  padding: 0;
  margin-bottom: 4rem;
  li {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr;
    color: ${props => props.theme.grey};
    list-style-type: none;
    > span {
      padding: 8px;
      border-left: 1px solid ${props => props.theme.grey};
      border-bottom: 1px solid ${props => props.theme.grey};
  }
  }
`;
const RankingsHeader = styled.h2`
  border-top: 1px solid ${props => props.theme.grey};
  border-left: 1px solid ${props => props.theme.grey};
  margin: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.3);
`;
const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  border-top: 1px solid ${props => props.theme.grey};
  span {
    font-weight: bold;
    padding: 8px;
    border-left: 1px solid ${props => props.theme.grey};
    border-bottom: 1px solid ${props => props.theme.grey};
  }
`;


class Result extends Component {
  constructor(props) {
    super(props);
    this.greatJob = this.greatJob.bind(this);
  }

  componentDidMount() { window.scrollTo(0, 0); }
  greatJob() {
    if (this.props.quizResult[0] >= 4) {
      return (
        <TopResults style={{ transitionDelay: `${4 * 0.10}s` }}>You are a real history buff! Great job!</TopResults>
      );
    }
  }
  render() {
    const users = [].concat(this.props.users)
    .filter((item) => {
      if (item.answersCount && item.time) {
        return item;
      }
    })
    .sort((a, b) => {
      if (a.answersCount.true > b.answersCount.true) {
        return -1;
      } else if (a.answersCount.true < b.answersCount.true) {
          return 1;
      }  // keyA == keyB
          if (a.time < b.time) {
              return -1;
          } else if (a.time > b.time) {
              return 1;
          }
              return 0;
    })
    .map((item, i) =>
      (<li key={i} >
        <span>{i + 1}.</span> <span>{item.user}</span>
        <span>{item.answersCount.true}</span> <span>{ms(item.time)}</span>
      </li>),
    );
    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <ResultContainer>
          <CSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <TopResults style={{ transitionDelay: `${0 * 0.10}s` }}>You had <strong>{this.props.quizResult[0]} true</strong> and <strong>{this.props.quizResult[1]} false</strong> !</TopResults>
            <TopResults style={{ transitionDelay: `${2 * 0.10}s` }}>Your time was <strong>{ms(this.props.finalTime)}</strong></TopResults>
            {this.greatJob()}
            <TopResults style={{ transitionDelay: `${6 * 0.10}s` }}>Thanks for Playing!
                You can learn more about Travis County history on <a href="https://traviscountyhistory.org">our website</a>.
            </TopResults>
          </CSSTransitionGroup>

          <Rankings>
            <RankingsHeader>Player Rankings</RankingsHeader>
            <TopBar>
              <span>Ranking</span>
              <span>Username</span>
              <span>True</span>
              <span>Time</span>
            </TopBar>
            {users}
          </Rankings>
        </ResultContainer>
      </CSSTransitionGroup>
    );
  }
}


export default Result;
