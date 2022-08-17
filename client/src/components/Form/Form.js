import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled from 'styled-components';
import axios from 'axios';
import CustomToast from '../Toast/CustomToast';
const Form = () => {
  // array od test words
  const [wordsList, setWordsList] = useState([]);
  // index for the current word
  const [index, setIndex] = useState(0);
  // score of the user
  const [score, setScore] = useState(0);
  // is test completed ?
  const [completed, setCompleted] = useState(false);
  // user rank after completing the test
  const [rank, setRank] = useState();
  // dynamic toast variant if correct answer or wrong answer
  const [variant, setVariant] = useState();
  // state for toast display
  const [showToast, setShowToast] = useState(false);
  // answer options
  const options = ['noun', 'adverb', 'adjective', 'verb'];

  useEffect(() => {
    // check if test completed
    if (index === 10) {
      setCompleted(true);
    }
  }, [index]);
  useEffect(() => {
    // if wordsList is empty fetch it from the backend
    if (wordsList.length === 0) {
      axios.get('http://127.0.0.1:5000/words').then((res) => {
        setWordsList(res.data.wordsList);
      });
    }
  }, [wordsList]);
  useEffect(() => {
    // if test completed fetch user rank from backend
    if (completed) {
      axios
        .post('http://127.0.0.1:5000/rank', {
          score: (score / wordsList.length) * 100,
        })
        .then((res) => {
          setRank(res.data.rank);
        });
    }
  }, [completed]);
  const handleClick = (event) => {
    // if correct answer increase score and toast correct answer for 1 sec
    if (event.target.value === wordsList[index].pos) {
      setScore(score + 1);
      setVariant('success');
    } else {
      setVariant('danger');
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
    setIndex(index + 1);
  };
  const handleRetry = () => {
    // reset all states when retrying the test
    setCompleted(false);
    setScore(0);
    setIndex(0);
    setWordsList([]);
    setRank(0);
  };
  return (
    <Container>
      {completed ? (
        <Completed>
          <Result>Test Completed, You Ranked Higher Than {rank}%</Result>
          <Retry onClick={handleRetry}>Try Again!</Retry>
        </Completed>
      ) : (
        <>
          <StyledProgressBar
            animated
            now={(index / 10) * 100}
            label={`${(index / 10) * 100}%`}
          />
          <Question>
            Q {index + 1}/{wordsList.length}
          </Question>
          <Phrase>
            is
            <Word>
              {wordsList.length && index < 10 ? wordsList[index].word : null}
            </Word>
            a
          </Phrase>
          <CustomToast variant={variant} show={showToast} />
          <ButtonContainer>
            {options.map((option) => {
              return (
                <Button value={option} onClick={handleClick} key={option}>
                  {option}
                </Button>
              );
            })}
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};
// UI Components
const Container = styled.div`
  background: #393d5e;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 5%;
  @media (min-width: 240px) {
    height: 70%;
    width: 80%;
  }
  @media (min-width: 1024px) {
    height: 70%;
    width: 50%;
  }
`;
const StyledProgressBar = styled(ProgressBar)`
  width: 75%;
  height: 10%;
  margin-top: 2%;
`;
const Question = styled.div`
  color: white;
`;
const Phrase = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  line-height: 53px;
  text-align: center;
  color: white;
  margin: auto;
  @media (min-width: 240px) {
    font-size: 32px;
    width: 80%;
  }
  @media (min-width: 1024px) {
    font-size: 48px;
    width: 40%;
  }
`;
const Word = styled.div`
  font-weight: 800;
  font-size: 48px;
  line-height: 53px;
  text-align: center;
  color: black;
  margin: auto;
  @media (min-width: 240px) {
    font-size: 32px;
  }
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;
const ButtonContainer = styled.div`
  background: transparent;
  padding: 2%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: auto;
  margin-bottom: 2%;

  @media (min-width: 240px) {
    width: 90%;
    height: 15%;
  }
  @media (min-width: 1024px) {
    width: 80%;
    height: 10%;
  }
`;
const Button = styled.button`
  background: transparent;
  width: fit-content;
  min-width: 10%;
  height: fit-content;
  padding: 1%;
  font-weight: 700;
  font-size: 10px;
  line-height: 13px;
  text-transform: uppercase;
  cursor: pointer;
  box-sizing: unset;
  border-radius: 20px;
  &:hover {
    background-color: white;
    transform: scale(1.05);
    box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12),
      0 8px 32px -8px hsla(0, 0%, 0%, 0.14),
      0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
  }
`;
const Completed = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Result = styled.div`
  color: white;
  font-weight: 800;
  line-height: 53px;
  text-align: center;
  @media (min-width: 240px) {
    font-size: 28px;
  }
  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;
const Retry = styled(Button)`
  color: white;
  border-color: white;
  font-size: 18px;
  margin: auto;
  &:hover {
    background-color: grey;
  }
  @media (min-width: 240px) {
    width: 40%;
    height: 10%;
  }
  @media (min-width: 1024px) {
    width: 20%;
    height: 10%;
  }
`;

export default Form;
