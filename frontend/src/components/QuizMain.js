import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Questions__ from './Questions__';
import { useHistory } from 'react-router';
import CountDownTimer from './CountDownTimer';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import arrayShuffle from 'array-shuffle';
import TimerCount from './TimerCount';

const QuizMain = () => {
    const history = useHistory()
    const [email, setEmail] = useState(history.location.email)
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0)
    const [response, setResponse] = useState(0)
    const [token, setToken] = useState('');
    const [time, setTime] = useState({});
    const [cat, setCat] = useState(history.location.state)
    const [userAns, setUserAns] = useState()
    const [userAllAns, setUserAllAns] = useState([])
    const [allOptions,setAllOptions]=useState([])
    const [allAnswers,setAllAnswers] = useState([])
    
    

    
    useEffect(() => {

      
        
        // window.history.pushState(null, document.title, window.location.href);
        // window.addEventListener('popstate', function (event) {
        //     window.history.pushState(null, document.title, window.location.href);
        // });

       

        setTime(localStorage.getItem("time"))
        const fetchData = async () => {
            setToken(localStorage.getItem('token'))
            const { data } = await axios.get('http://localhost:3001/addQuestion/' + cat, {
                headers: {
                    token: token
                }
            })
            setQuestions(data)
           

        }
        
        fetchData();
    }, [questions, token]);

    const marks = () => {
        setScore(score + 1)
    }
    const attempted = () => {
        setResponse(response + 1)
    }
    const getAllResult = (text) => {
        setUserAns(text)
       
        


    }


    // const sendScore = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const s = await axios.post('http://localhost:3001/score',
    //             {
    //                 email: email,
    //                 score: score
    //             })

    //         alert('quiz has been submitted successfully.')
    //         history.push({
    //             pathname: '/result',
    //             state: email

    //         })


    //     }

    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    const logoutHandler = () => {
        history.push({
            pathname: '/logout'
        })
    }

  


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Online Quiz</Navbar.Brand>


                    <Nav>
                        <Nav.Link onClick={e => logoutHandler()} >Logout</Nav.Link>

                    </Nav>



                </Container>
            </Navbar>
            {/* <TimerCount
            emaill={email}
            score={score}
            /> */}

            <CountDownTimer
                countDownTimestampMs={time}
                emaill={email}
                score={score}
            />


            <h1 className="text-danger">You can choose only one option</h1>
            <h2>
                Score: {score} / {response}
                {response !== 0 && (
                    <span> = {(score / response) * 100}%</span>
                )}
            </h2>
        
        
                

            <Questions__ questions={questions} marks={marks} attempted={attempted} getAllResult={getAllResult} cat = {cat} />
           
            {/* <form onSubmit={e => sendScore(e)}>

                <Button type='submit' variant="secondary" >Submit</Button>

            </form> */}

        </div>
    )

}


export default QuizMain
