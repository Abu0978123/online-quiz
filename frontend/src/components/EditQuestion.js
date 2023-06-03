import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'

const EditQuestion = (props) => {

    const history = useHistory()

    const [question, setQuestion] = useState(props.question.question)
    const [correctOption, setCorrectOption] = useState(props.question.correct_option);
    const [allIncorrect, setAllIncorrect] = useState(props.question.incorrect_options)
    const [inCorrectOption1, setInCorrectOption1] = useState(props.question.incorrect_options[0])
    const [inCorrectOption2, setInCorrectOption2] = useState(props.question.incorrect_options[1])
    const [inCorrectOption3, setInCorrectOption3] = useState(props.question.incorrect_options[2])
    const [updatedIncorrect, setUpdatedIncorrect] = useState()
    const [id, setID] = useState(props.id)
    

    useEffect(() => {
        setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])

    }, [inCorrectOption3])



    const handleChange = (e) => {

        if (e.target.name === "question") {
            setQuestion(e.target.value)

            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
        }
        if (e.target.name === "correct_option") {
            setCorrectOption(e.target.value)

            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
        }
        if (e.target.name === "incorrect_option_1") {
            setInCorrectOption1(e.target.value)

            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
        }
        if (e.target.name === "incorrect_option_2") {
            setInCorrectOption2(e.target.value)

            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
        }
        if (e.target.name === "incorrect_option_3") {
            setInCorrectOption3(e.target.value)

            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
            setUpdatedIncorrect([inCorrectOption1, inCorrectOption2, inCorrectOption3])
        }

    }
    const update = (e) => {
        e.preventDefault();

        const t = axios.patch('http://localhost:3001/addQuestion/' + id,
            {
                question: question,
                correct_option: correctOption,
                incorrect_options: updatedIncorrect,


            })
        alert(question + " has been updated successfully")
      
    }
    return (
        <div>

            <Card style={{ width: '50rem' }}>

                <Card.Body>
                    <Card.Title>Edit Question</Card.Title>
                    <form onSubmit={(e) => {
                        update(e)
                        props.handleToggle(false)
                        }}>
                        <div class="form-group">
                            <label > Question</label>
                            <input
                                type="text"
                                name="question"
                                class="form-control"
                                placeholder='enter your question here'
                                value={question}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div class="form-group">
                            <label > Correct Option</label>
                            <input
                                type="text"
                                class="form-control"
                                name="correct_option"
                                placeholder='enter your correct option here'
                                value={correctOption}
                                onChange={(e) => handleChange(e)} />

                        </div>
                        <div class="form-group">
                            <label > Incorrect Option 1</label>
                            <input
                                type="text"
                                name="incorrect_option_1"
                                class="form-control"
                                value={inCorrectOption1}
                                placeholder='enter your incorrect option 1 here'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div class="form-group">
                            <label > Incorrect Option 2</label>
                            <input
                                type="text"
                                class="form-control"
                                name='incorrect_option_2'
                                value={inCorrectOption2}
                                placeholder='enter your incorrect option 2 here'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div class="form-group">
                            <label > Incorrect Option 3</label>
                            <input
                                type="text"
                                name="incorrect_option_3"
                                class="form-control"
                                value={inCorrectOption3}
                                placeholder='enter your incorrect option 3 here'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <Button variant="primary" type="submit">Submit</Button>
                    </form>
                </Card.Body>
            </Card>

        </div>
    )
}

export default EditQuestion