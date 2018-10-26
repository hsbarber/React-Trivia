import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ms from 'pretty-ms';
import Background from '../img/historyday.jpg';
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
    /* transition-delay: ${props => `${props.delay * 0.20}s`} ; */
    strong {
      font-weight: bold;
      text-decoration: underline;
    }

`;
const Banner = styled.div`
  position: relative;
  max-width: 100%;
  height: auto;
  img {
    width: 100%;
    margin: 0;
  }
`;
const BannerText = styled.div`
  display: block;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem ;
  margin: 0;
  h1, h4 {
    color: rgba(256, 256, 256, 0.8);
    padding: 0 2rem;
  }
  @media (min-width: 1360px) {
    position: absolute;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);

    width: 30%;
  }

`;
const LearnMore = styled.h2`
  text-align: left;
  a {

    color: ${props => props.theme.accent};
    transition: 0.3s ease-in-out;
    border-bottom: 2px solid transparent;
    &:hover{
      border-bottom: 2px solid ${props => props.theme.accent};
    }
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
            <TopResults style={{ transitionDelay: `${6 * 0.10}s` }}>To learn more about Travis County's history,
                          come to Travis County History Day on November 2nd.
            </TopResults>
          </CSSTransitionGroup>


          <Banner>
            <img src={Background} alt="historydaybg" />
            <BannerText>
              <h1>11th annual Travis County History Day</h1>
              <h4>A Catalyst for Change:</h4>
              <h4>The Impact and Effect of World War I on Travis County</h4>
              <h4>10am-noon</h4>
              <h4>Nov. 2, 2018</h4>
              <h4>700 Lavaca St., Commissioners Courtroom and Hall of Government</h4>
            </BannerText>
          </Banner>
          <LearnMore>
            <a href="https://www.facebook.com/TravisCountyHistoryDay/">
              Learn more at our Facebook page!
            </a>
          </LearnMore>
          <h2>Thanks for Playing!</h2>

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
