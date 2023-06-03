import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const AddQuestions = () => {

    const history = useHistory();

    const [time, setTime] = useState('');



    const [question, setQuestion] = useState("");
    const [allQuestions, setAllQuestions] = useState([]) //this is for show all questions to the teacher
    const [correctOption, setCorrectOption] = useState('')
    const [inCorrectOption1, setInCorrectOption1] = useState('')
    const [inCorrectOption2, setInCorrectOption2] = useState('')
    const [inCorrectOption3, setInCorrectOption3] = useState('')
    const [allIncorrect, setAllIncorrect] = useState([])//sending to backend all incorrect options
    const [token, setToken] = useState('')





    useEffect(() => {
        const get = async () => {
            try {
                setToken(localStorage.getItem('token'))
                const { data } = await axios.get('http://localhost:3001/addQuestion', {
                    headers: {
                        token: token
                    }

                })
                setAllQuestions(data)

                setAllIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
            }

            catch (err) {
                console.log(err)
            }
        }
        get();
    }, [allQuestions, token])


    const handleChange = (e) => {

        if (e.target.name === "question") {
            setQuestion(e.target.value)
        }
        if (e.target.name === "correct_option") {
            setCorrectOption(e.target.value)
        }
        if (e.target.name === "incorrect_option_1") {
            setInCorrectOption1(e.target.value)
        }
        if (e.target.name === "incorrect_option_2") {
            setInCorrectOption2(e.target.value)
        }
        if (e.target.name === "incorrect_option_3") {
            setInCorrectOption3(e.target.value)
        }

    }

    const addQ = (e) => {
        e.preventDefault();
        try {

            const t = axios.post('http://localhost:3001/addQuestion', {
                question: question,
                correct_option: correctOption,
                incorrect_options: allIncorrect,

            })

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = (q) => {
        history.push({
            pathname: ('/editQuestion'),
            state: q
        })
    }

    const handleDelete = async (id) => {
        try {

            const deletedQuestion = await axios.delete('http://localhost:3001/addQuestion/' + id)
            if (deletedQuestion) {
                alert("question has been deleted")
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleChangeTime = (e) => {
        if (e.target.name === "time") {
            setTime(e.target.value)
        }

    }
    const addTime = async (e) => {
        e.preventDefault();
        try {
            await localStorage.setItem('time',time)
              
                alert("time added successfully")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Add time</h1>
            <form>
                <label>add time</label>
                <input
                    type="datetime-local"
                    name="time"
                    placeholder="add time here"
                    value={time}
                    onChange={(e) => handleChangeTime(e)}
                />
                <button type='submit' onClick={e => addTime(e)}>Add time</button>
            </form>
            <br></br>

            <h1>add question</h1>
            <form onSubmit={(e) => addQ(e)} >
                <label>Question</label>
                <input
                    type="text"
                    name="question"
                    placeholder="add question here..."
                    value={question}
                    onChange={(e) => handleChange(e)}
                />

                <br></br>
                <label>Correct option</label>
                <input
                    type="text"
                    name="correct_option"
                    placeholder="add correct option here..."
                    value={correctOption}
                    onChange={(e) => handleChange(e)}
                />
                <br></br>
                <label>InCorrect Option 1</label>
                <input
                    type="text"
                    name="incorrect_option_1"
                    placeholder="add incorrect option here..."
                    value={inCorrectOption1}
                    onChange={(e) => handleChange(e)}
                />
                <br></br>
                <label>InCorrect Option 2</label>
                <input
                    type="text"
                    name="incorrect_option_2"
                    placeholder="add incorrect option here..."
                    value={inCorrectOption2}
                    onChange={(e) => handleChange(e)}
                />
                <br></br>
                <label>InCorrect Option 3</label>
                <input
                    type="text"
                    name="incorrect_option_3"
                    placeholder="add incorrect option here..."
                    value={inCorrectOption3}
                    onChange={(e) => handleChange(e)}
                />
                <br></br>



                <button type='submit'>add Question</button>
            </form>


            {<ol>{
                allQuestions.map((q) => {
                    return (<div>


                        <li>{q.question}

                            <button onClick={e => handleEdit(q)} >edit</button>
                            <button onClick={e => handleDelete(q._id)}>delete</button>

                            {<ul>
                                <li>{q.correct_option}

                                </li>

                                <li>{q.incorrect_options.map((incorrect_option) => {
                                    return <li>{incorrect_option}</li>
                                })}</li>



                            </ul>}

                        </li>


                    </div>


                    )
                })
            }
            </ol>
            }




        </div>
    )
}

export default AddQuestions