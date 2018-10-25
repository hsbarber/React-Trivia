
import React from 'react';
import styled from 'styled-components';
import Check from '../svg/icon-check.svg';

const Answer = styled.li`
  border-top: 1px solid ${props => props.theme.offWhite};
  padding: 1.5rem 0;
  /* display: flex;
  align-items: center; */
  &:hover {
    background: ${props => props.theme.offWhite};
  }


  .radioCustomButton {
  position: absolute;
  width: auto;
  opacity: 0;
}

.radioCustomButton,
.radioCustomLabel {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.radioCustomLabel {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 2.2rem 2.5rem 2.5rem 8rem;
  font-size: 16px;
  line-height: 1.5;
}

.radioCustomButton ~ .radioCustomLabel:before {
  position: absolute;
  top: 20px;
  left: 38px;
  width: 28px;
  height: 28px;
  content: '';
  display: inline-block;
  vertical-align: middle;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 50%;
  transition: all 0.3s;
}

.radioCustomButton:checked ~ .radioCustomLabel:before {
  content: '';
  background: ${props => props.theme.accent} url(${Check}) no-repeat;
  background-size: 27px;
  border-color: ${props => props.theme.accent};
}
  /* input {
    position: absolute;
    width: auto;
    opacity: 0;
  }
  input, label {
    cursor: pointer;
    display: inline;
  }
  /* input:checked ~ label {
    background-color: ${props => props.theme.offWhite};
  } */
  /* input:checked ~ label:before {
    content: '';
    background:  ${props => props.theme.accent} url(${Check}) no-repeat;
    background-size: 27px;
    border-color: ${props => props.theme.accent};
  } */
  /* label {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 0 0 8rem;
    font-size: 2rem;
    font-family: 'Crimson Text', serif;
    &:before {
      position: absolute;
      top: 0;
      left: 38px;
      width: 28px;
      height: 28px;
      content: '';
      display: inline-block;
      vertical-align: middle;
      background: #fff;
      border: 1px solid ${props => props.theme.grey};
      border-radius: 50%;
      transition: all 0.3s;
    }
  }  */


`;


  function AnswerOption(props) {
    return (
      <Answer>

        <input
          type="radio"
          className="radioCustomButton"
          name={props.answer}
          checked={props.answerNumber === props.checked} // This value will be a boolean (true or false) based on whether the answer selected is equal to the answer option type.
          value={props.answerNumber}
          id={props.answerNumber}
          disabled={props.checked}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerNumber}>
          {props.answerContent}
        </label>
      </Answer>
    );
  }


  export default AnswerOption;
