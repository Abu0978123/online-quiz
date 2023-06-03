
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import StudentRegister from './components/StudentRegister'
import StudentLogin from './components/StudentLogin'
import Logout from './components/Logout'
import QuizMain from './components/QuizMain'
import Home from './components/Home'
import TeacherRegistration from './components/TeacherRegistration'
import TeacherLogin from './components/TeacherLogin'
import AddQuestions from './components/AddQuestions'
import EditQuestion from './components/EditQuestion'
import CountDownTimer from './components/CountDownTimer'
import Result from './components/Result'
import Dashboard from './components/Dashboard/Dashboard'
import MainDashbaoard from './components/Dashboard/MainDashbaoard'
import Catagory from './components/Catagory'
import TeacherCat from './components/TeacherCat'
import Testing from './components/Testing'
import TimerCount from './components/TimerCount'
import Questions from './components/quizFolder/Questions'
import QuestionCategory from './components/quizFolder/QuestionCategory'
import './styles/index.css'
import ShowResult from './components/quizFolder/ShowResult'


const App = () => {


  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact>
            < Home />
          </Route>
          <Route path='/dashboard'>
            < MainDashbaoard />
          </Route>
          <Route path='/student/register'>
            <StudentRegister />
          </Route>
          <Route path='/teacher/register'>
            <TeacherRegistration />
          </Route>
          <Route path='/student/register' >
            <StudentRegister />
          </Route>
          <Route path='/student/login' >
            <StudentLogin />
          </Route>
          <Route path='/teacher/login'>
            <TeacherLogin />
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
          <Route path='/quiz'>
            <QuizMain />
          </Route>
          <Route path='/result'>
            <Result />
          </Route>
          <Route path='/addQuestions'>
            <AddQuestions />
          </Route>

          <Route path='/editQuestion'>
            <EditQuestion />
          </Route>
          <Route path='/catagory'>
            <Catagory />
          </Route>
          <Route path='/teacherCatagory'>
            <TeacherCat />
          </Route>
          <Route path='/test'>
            <Testing />
          </Route>
          <Route path='/timer'>
            <TimerCount />
          </Route>
          <Route path='/cat'>
            <QuestionCategory />
          </Route>
         
          <Route path='/q'>
            <Questions />
          </Route>
         
         










        </Switch>
      </Router>
    </div>
  )
}

export default App