const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors');
const userRoute = require('./routes/user');
const teacherRoute = require('./routes/teacher')
const questionRoute = require('./routes/question');
const scoreRoute = require('./routes/score');
const timeRoute = require('./routes/time')
const catagoryRoute = require('./routes/catagory')
const topicRoute  =require('./routes/topic')


const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/user', userRoute)
app.use('/teacher', teacherRoute)
app.use('/addQuestion', questionRoute)
app.use('/score', scoreRoute)
app.use('/time', timeRoute)
app.use('/catagory',catagoryRoute)
app.use('/topic',topicRoute)

mongoose.connect('mongodb://localhost:27017/osama', () => {
    console.log('Connected to DB!!')
})

// this is for api testing
app.get('/', (req, res)=>{
    res.send('hellow world i am from api testing')
})


app.listen(PORT, console.log('API is running on port :' + PORT));


