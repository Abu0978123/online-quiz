import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap'
import { useHistory } from 'react-router';
import DBresult from './DBresult';
import DBtime from './DBtime'
import EditQuestion from '../EditQuestion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
    const history = useHistory();
    const [time, setTime] = useState('');
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState('')
    const [allQuestions, setAllQuestions] = useState([]) //this is for show all questions to the teacher
    const [correctOption, setCorrectOption] = useState('')
    const [inCorrectOption1, setInCorrectOption1] = useState('')
    const [inCorrectOption2, setInCorrectOption2] = useState('')
    const [inCorrectOption3, setInCorrectOption3] = useState('')
    const [allIncorrect, setAllIncorrect] = useState([])//sending to backend all incorrect options
    const [token, setToken] = useState('')
    const [result, setResult] = useState([])
    const [student, setStudent] = useState([])
    const questionsLength = allQuestions.length
    const resultLength = result.length
    const [cat, setCat] = useState(history.location.state)
    const [isToggled, setIsToggled] = useState(false)
    const [id, setID] = useState()
    const [catagory, setCatagory] = useState('')
    const [selectTopic, setSelectTopic] = useState('')
    const [addTopics, setAddTopics] = useState('')
    const [selectOneCatagory, setSelectOneCatagory] = useState('')
    const [allCatagories, setAllCatagories] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [editOneQuestion, setEditOneQuestion] = useState()
    const [selectedTopic, setSelectedTopic] = useState()


    useEffect(() => {


        const getAllQuestions = async () => {
            //get all questions from database
            try {
                setToken(localStorage.getItem('token'))
                const { data } = await axios.get('http://localhost:3001/addQuestion/' + selectOneCatagory, {
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
        //get all catagories
        const getAllCatagories = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/catagory')
                setAllCatagories(data)
            }
            catch (err) {
                console.log(err)
            }

        }
        //get all topics from DB
        const fetchTopics = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/topic')
                setAllTopics(data)
            }
            catch (err) {
                console.log(err)
            }

        }
        const filteredTopics = async () => {
            try {
                const khan = await allTopics.filter((all) => {
                    return selectOneCatagory === all.catagory
                })
                setSelectedTopic(khan)
            }
            catch (err) {
                console.log(err)
            }
        }

        //get all student result
        const getResult = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/score')
                setResult(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllQuestions();
        getAllCatagories();
        fetchTopics();
        filteredTopics();
        getResult();
    }, [allQuestions, token])



    const handleChange = (e) => {

        if (e.target.name === "question") {
            setQuestion(e.target.value)
        }
        if (e.target.name === "topic") {
            setTopic(e.target.value)
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
        if (e.target.name === "catagory") {
            setCatagory(e.target.value)
        }
        if (e.target.name === "topics") {
            setAddTopics(e.target.value)
        }
        if (e.target.name === "topic") {
            setTopic(e.target.value)
        }

    }
    const addQ = (e) => {
        e.preventDefault();
        try {

            const t = axios.post('http://localhost:3001/addQuestion', {
                catagory: selectOneCatagory,
                topic: topic,
                question: question,
                correct_option: correctOption,
                incorrect_options: allIncorrect,

            })
            toast.success('🦄 Question added successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                });
        }
        catch (err) {
            console.log(err)
        }
    }
    const addSubject = (e) => {
        e.preventDefault();
        try {

            const t = axios.post('http://localhost:3001/catagory', {
                catagory: catagory,
            })
            const duplicate = allCatagories.filter((du) => {
                return du.catagory === catagory
            })

            console.log(duplicate)

            toast(`${catagory} is added successfully !!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });

        }
        catch (err) {
            console.log(err)
        }
    }
    const addTopic = (e) => {
        e.preventDefault();
        try {
            if (selectOneCatagory === '' || selectOneCatagory === 'Select Subject') {
                alert("please select subject")
                return false
            }
            else {
                const t = axios.post('http://localhost:3001/topic', {
                    topic: addTopics,
                    catagory: selectOneCatagory,
                })

                toast(`Topic added successfully !!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {

            const deletedQuestion = await axios.delete('http://localhost:3001/addQuestion/' + id)
            if (deletedQuestion) {
                toast(`Question has been deleted successfully !!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleToggle = (oo) => {
        setIsToggled(oo)
    }
    const handleDltOneTopic = (id) => {
        const res = axios.delete('http://localhost:3001/topic/' + id)
        if (res) {
            toast(`Topic deleted successfully !!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div class="col main pt-5 mt-3">



            <p class="lead d-none d-sm-block">Teacher administration pannel</p>

            <div class="row mb-3">

                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                            <div class="rotate">
                                <i class="fa  fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">students</h6>
                            <h1 class="display-4">
                                {resultLength}
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body bg-dark" style={{ backgroundColor: "#57b960" }}>
                            <div class="rotate">
                                <i class="fa  fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Subjects</h6>

                            <h1 className="text-uppercase">{allCatagories.length}</h1>

                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6 py-2">

                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <i class="fa fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">questions</h6>
                            {
                                <h1 class="display-4">

                                    {questionsLength}

                                </h1>
                            }
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-info h-100">
                        <div class="card-body bg-info">
                            <div class="rotate">
                                <i class="fab  fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">results</h6>
                            <h1 class="display-4">
                                {resultLength}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr />




            <Card style={{ width: '50rem' }}>

                <Card.Body>
                    <Card.Title>Add SUbject</Card.Title>
                    <form onSubmit={(e) => addSubject(e)}>
                        <div class="form-group">
                            <label > Subject</label>
                            <input
                                type="text"
                                name="catagory"
                                class="form-control"
                                placeholder='enter your subject here'
                                required={true}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <Button variant="primary" style={{ float: 'right' }} type="submit">Add Subject</Button>
                    </form>
                </Card.Body>
            </Card>
            <br></br>
            <Card style={{ width: '50rem' }}>

                <Card.Body>
                    <Card.Title>Add topics</Card.Title>
                    <label>Subject</label>

                    <form onSubmit={(e) => addTopic(e)}>
                        <Form.Select aria-label="Default select example" onChange={e => setSelectOneCatagory(e.target.value)} >
                            <option>Select Subject</option>
                            {
                                allCatagories.map((OneCatagory) => {
                                    return <option>{OneCatagory.catagory}</option>
                                })
                            }
                        </Form.Select>

                        <div class="form-group">
                            <label > Topics</label>
                            <input
                                type="text"
                                name="topics"
                                class="form-control"
                                placeholder='enter your topicss here'

                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <Button variant="primary" style={{ float: 'right' }} type="submit">Add topic</Button>
                    </form>
                </Card.Body>
            </Card>

            <br></br>
            <br></br>
            <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title>All Topics</Card.Title>
                    <ol>
                        {
                            selectedTopic && selectedTopic.map((oneTopic) => {
                                return <div>
                                    <li>{oneTopic.topic}
                                        <Button variant="danger" onClick={e => handleDltOneTopic(oneTopic._id)} style={{ float: 'right' }}>x</Button>
                                        <hr></hr> </li>
                                </div>
                            })
                        }
                    </ol>
                </Card.Body>
            </Card>
            <br></br>
            <br></br>

            {
                isToggled ? <EditQuestion

                    allIncorrect={allIncorrect}
                    question={editOneQuestion}
                    id={id}
                    handleToggle={handleToggle} /> :
                    <Card style={{ width: '50rem' }}>

                        <Card.Body>
                            <Card.Title>Add Question</Card.Title>
                            <form onSubmit={(e) => addQ(e)}>
                                <div class="form-group " id='addQ'>
                                    <label > Question</label>
                                    <input
                                        type="text"
                                        name="question"
                                        class="form-control"
                                        placeholder='enter your question here'
                                        value={question}
                                        required={true}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label > Topic</label>
                                    <Form.Select aria-label="Default select example" onChange={e => setTopic(e.target.value)} >
                                        <option>Select Topic</option>
                                        {
                                            selectedTopic && selectedTopic.map((oneTopic) => {
                                                return <option>{oneTopic.topic}</option>
                                                   
                                            })
                                        }
                                    </Form.Select>
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
                                        required={true}
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
                                        required={true}
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
                                        required={true}
                                        placeholder='enter your incorrect option 3 here'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <Button variant="primary" type="submit" style={{ float: 'right' }}>Add Question</Button>
                            </form>
                        </Card.Body>
                    </Card>
            }
            <br></br>
            <br></br>
            <br></br>
            <div id='addQuestion'>
                <Card style={{ width: '50rem' }}>
                    <Card.Body>
                        <Card.Title>All Questions</Card.Title>
                        {<ol>{
                            allQuestions.map((q) => {
                                return (<div id='allQuestions'>

                                    <li>{q.question}

                                        <button type="button" class="btn btn-danger" style={{ float: 'right' }} onClick={e => handleDelete(q._id)} >DELETE</button>
                                        <button type="button" class="btn btn-secondary" style={{ float: 'right' }} onClick={(e) => {
                                            setIsToggled(true)
                                            setID(q._id)
                                            setEditOneQuestion(q)

                                        }}>
                                            EDIT
                                        </button>
                                        {<ul>
                                            <li>{q.correct_option}
                                            </li>
                                            <li>{q.incorrect_options.map((incorrect_option) => {
                                                return <li>{incorrect_option}</li>
                                            })}</li>
                                        </ul>}
                                    </li>
                                    <hr></hr>
                                </div>
                                )
                            })
                        }
                        </ol>
                        }

                    </Card.Body>
                </Card>
                {/* timer */}
                <br></br>
                <br></br>
                <br></br>
                <DBtime />
                <br></br>
                <br></br>
                <br></br>
                <DBresult />
                <br></br>
                <br></br>
                <br></br>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </div >
    )
}

export default Dashboard