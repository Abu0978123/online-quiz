import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getRemainingTimeUntilMsTimestamp } from '../utils/CountDownTimerUtils'
import ShowResult from './ShowResult';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CountDownTimer from '../CountDownTimer';

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
}
const Questions = () => {
  const history = useHistory()

  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [curQuestionNo, setCurQuestionNo] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false);
  const [cat, setCat] = useState(history.location.state)
  const [time, setTime] = useState({});
  const [email, setEmail] = useState(history.location.email);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
 

 


  const createMarkup = (text) => {
    return { __html: text };
  };

  const fetchQuizData = async () => {

    try {

      const { data } = await axios.get('http://localhost:3001/addQuestion/' + cat);

      setQuestions(data)
      setAllAnswers(
        [...data[0].incorrect_options, data[0].correct_option].sort(() => Math.random() - 0.5)
      );
      setTime(localStorage.getItem("time"))


    } catch (error) {
      console.log('error', error);
    }

  };

  useEffect(() => {

    fetchQuizData();

    const intervalID = setInterval(() => {
      updateRemainingTime(time)
    }, 1000);


    return () => {
      clearInterval(intervalID);
    }

    // eslint-disable-next-line
  }, [time]);
  function updateRemainingTime(countDown) {

    setRemainingTime(getRemainingTimeUntilMsTimestamp(countDown))
  }


  const nextQuestion = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert('Please select one answer !');
      return false;
    }

    setAllAnswers(
      [
        ...questions[curQuestionNo + 1].incorrect_options,
        questions[curQuestionNo + 1].correct_option,
      ].sort(() => Math.random() - 0.5)
    );

    setCurQuestionNo(curQuestionNo + 1);
  };
  const showResult = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert('Please select one answer !');

      return false;
    }

    setResult(true);
  };

  const reset = () => {
    history.push('/');
  };

  const getAnswer = (e, ans) => {
    questions[curQuestionNo].userAnswer = ans;
    setSelected(ans);
  };
  // const handleTime = (remainingTime) => {
  //   setName(remainingTime)
  // }
  return (
    <div   className=' questionContent mt-5 questions-div d-flex justify-content-lg-center col-lg-12 col-sm-12'
    >

      {remainingTime ?
        !result ? (
          <div>
            <div className='countDown-timer col-lg-12 col-sm-12 py-2'>
              <span>{remainingTime.days}</span>
              <span>days</span>
              <span>{remainingTime.hours}</span>
              <span>hours</span>
              <span>{remainingTime.minutes}</span>
              <span>minutes</span>
              <span>{remainingTime.seconds}</span>
              <span>seconds</span>
            </div>
       

            {questions.length > 0 && (
              <>
                <Card className=' col-lg-12 mt-2 col-sm-12 py-2 '>
                  <div className='question'>
                    <p
                      dangerouslySetInnerHTML={createMarkup(
                        questions[curQuestionNo].question
                      )}
                      className='questionText'
                    ></p>
                  </div>
                  <hr style={{marginTop:'30px'}}/>
                  <Card.Body>
                   <ol>
                   {allAnswers.map((ans, i) => {
                      return (
                        <div
                          className={
                            selected === ans ? 'selected answer' : 'answer'
                          }
                          key={i}
                          onClick={(e) => {
                            getAnswer(e, ans);
                          }}
                        >
                          <li dangerouslySetInnerHTML={createMarkup(ans)}></li>
                        </div>
                      );
                    })}
                   </ol>

                    <div>
                      <Button

                        variant='outline-danger'
                        color='secondary'
                        style={{ float: 'right' }}
                        onClick={questions.length === curQuestionNo + 1 ? showResult : nextQuestion}
                      >
                        {questions.length === curQuestionNo + 1
                          ? 'Finish'
                          : 'Next Qustion'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )}
          </div>
        ) : <ShowResult
          questions={questions}
          createMarkup={createMarkup}
          reset={reset}
          remainingTime={remainingTime}
          email={email}

        /> : (
          <ShowResult
            questions={questions}
            createMarkup={createMarkup}
            reset={reset}
            remainingTime={remainingTime}
            email={email}

          />

        )}

    </div>
  );
};

export default Questions;
