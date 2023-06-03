import React, { useEffect, useState } from 'react'
import './counter.css'
import { getRemainingTimeUntilMsTimestamp } from '../components/utils/CountDownTimerUtils'
import { useHistory } from 'react-router'
import axios from 'axios'
import ShowResult from './quizFolder/ShowResult'
import Questions from './quizFolder/Questions'

const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
}
const CountDownTimer = ({ countDownTimestampMs, emaill, score,name }) => {
    const history = useHistory()
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [email, setEmail] = useState(emaill)

    if (remainingTime.days === 0
        && remainingTime.hours === 0
        && remainingTime.minutes === 0
        && remainingTime.seconds === 0) {
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
        alert("times")
        history.push({

            state: email
        })

    }

    useEffect(() => {
        
        const intervalID = setInterval(() => {
            updateRemainingTime(countDownTimestampMs)
        }, 1000);
        name(remainingTime)

        return () => {
            clearInterval(intervalID);
        }


    }, [countDownTimestampMs])

    function updateRemainingTime(countDown) {

        setRemainingTime(getRemainingTimeUntilMsTimestamp(countDown))
    }


    return (

        <div>
            
             
              
              <div className='countDown-timer'>
                  
              <span>{remainingTime.days}</span>
              <span>days</span>
              <span>{remainingTime.hours}</span>
              <span>hours</span>
              <span>{remainingTime.minutes}</span>
              <span>minutes</span>
              <span>{remainingTime.seconds}</span>
              <span>seconds</span>
          </div>
            
           
        </div>
    )
}

export default CountDownTimer