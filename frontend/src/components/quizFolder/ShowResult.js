import { Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Ranking from './Ranking';

const ShowResult = ({ questions, createMarkup, reset, parentF, email, remainingTime }) => {
  const history = useHistory()
  const [score, setScore] = useState(null);
  const [isToggled, setIsToggled] = useState(true)

  //setting score value
  useEffect(() => {
    if (questions.length > 0) {
      setScore(questions.filter((q) => q.userAnswer === q.correct_option).length * 10);

    }

    // saving the result to database
    if (remainingTime == false || score !== null) {
      const sendScore = async () => {
        try {
          await axios.post('http://localhost:3001/score', {
            email: email,
            score: score
          })
        }
        catch (err) {
          console.log(err)
        }
      }
      sendScore();
    }
    console.log(score)


    // eslint-disable-next-line
  }, [score]);

  const rankCard = () => {
    setIsToggled(!isToggled)
    
  }

  return (
    <div
      style={{ width: '100%', marginTop: '-30px', }}
    >
      <Card className='col-lg-12  col-sm-12 py-2'
        style={{ backgroundColor: 'rgb(186, 233, 233)' }}
      >
        <Card.Title
          style={{
            textAlign: 'center',
            backgroundColor: 'rgb(73, 189, 235)',
            color: 'white',
            height: '70px',
            fontSize: '50px'
          }}
        >{isToggled ? 'Result Card':'Details'} </Card.Title>
       {isToggled && 
        <Card.Body>

        <p
          style={{
            textAlign: 'center',
            fontSize: '1.59rem',
            fontWeight: 'bold',
          }}
        >
          Your Score: {score}
        </p>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.59rem',
            fontWeight: 'bold',
          }}
        >
          Total Score: {questions.length * 10}
        </p>
       
      </Card.Body>
       }
      </Card>
      <div style={{textAlign:'center'}}>
      < Button variant="success" style={{ margin: '20px' }} onClick={e => rankCard()}>{isToggled ? 'show more details' : 'show Result card'}</Button>
      </div>

      {/*
      <-----------------------------------
       showing each question in result card 
       ----------------------------------->
       */}


      {isToggled ? questions.map((q, i) => {
        return (
          <Card className=' col-lg-12 col-sm-12 py-2'
            key={i} style={{ marginTop: '15px' }}>
            <div className='question'>
              <p
                className='questionText'
                dangerouslySetInnerHTML={createMarkup(q.question)}
              ></p>
            </div>
            <hr />
            <Card.Body>
              <div style={{ textAlign: 'center' }} className='answerq'>
                <b>Your Answer: </b>{' '}
                <p
                  dangerouslySetInnerHTML={createMarkup(q.userAnswer)}
                  className={
                    q.userAnswer === q.correct_option ? 'correct' : 'wrong'
                  }
                ></p>
                <hr />
                <b>Correct Answer : </b>
                <p
                  dangerouslySetInnerHTML={createMarkup(q.correct_option)}
                  className='correct'
                ></p>
                <hr />
                <b>Question Topic : </b>
                <p
                  dangerouslySetInnerHTML={createMarkup(q.topic)}
                  className='correct'
                ></p>
              </div>
              <p style={{ float: 'right', color: 'blue' }}>
                <b>Mark : {q.userAnswer === q.correct_option ? '10' : '00'} </b>
              </p>
            </Card.Body>
          </Card>
        );
      }) :
        <Ranking
          questions={questions}
        />
      }
      <div style={{textAlign:'center'}}>
        <Button

          className='text-center justify-content-center'
          variant='primary'
          onClick={reset}
          style={{ marginTop: '35px', marginBottom: '15px', width: '30%',textAlign:'center' }}

        >
          Go Home Page
        </Button>
      </div>
    </div>
  );
};

export default ShowResult;
