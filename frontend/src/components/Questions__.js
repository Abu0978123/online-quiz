import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Question__ from './Question__'
import {Button } from 'react-bootstrap'
import axios from 'axios'

const Questions__ = (props) => {
    const [ans, setAns] = useState("osama")
    const [allAns, setAllAns] = useState([])
    const history = useHistory();
    const [email, setEmail] = useState(history.location.email)
    const [score, setScore] = useState(0)
    const [cat,setCat] =useState()
    const [questions,setQuestions] = useState()
    



    useEffect(() => {
        setAllAns(ans)
        setAllAns(allAns.concat(ans))
      

    }, [ans])

    const sendScore = async (e) => {
        e.preventDefault()
        try {
            const s = await axios.post('http://localhost:3001/score',
                {
                    email: email,
                    score: score
                })

            alert('quiz has been submitted successfully.')
            history.push({
                pathname: '/result',
                state: props.questions,
                
                
            
            })
          


        }

        catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <ol>
                {
                    props.questions.map((question, i) => {
                        return <Question__ question={question} key={i} marks={props.marks} attempted={props.attempted}
                            getAllResult={props.getAllResult} setAns={setAns} setAllAns={setAllAns}

                        />
                    })
                }
            </ol>

            <form onSubmit={e => sendScore(e)}>

                <Button type='submit' variant="secondary" >Submit</Button>

            </form>


        </div>
    )
}

export default Questions__
