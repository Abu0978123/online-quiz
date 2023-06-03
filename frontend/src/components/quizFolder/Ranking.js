import React, { useState, useEffect } from 'react'

import { Card, Table } from 'react-bootstrap'

const Ranking = ({ questions }) => {

    const t = questions.map((q) => {
        return q.topic
    })
    let unique = [...new Set(t)] // returns unique topics
    const map = t.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()) //show totall number of questions
    const topicNo = [...map.values()]

    //Number correct of questions
    const allCorrectQuestions = questions.filter((q) => {
        return q.correct_option === q.userAnswer
    })

    const corr = allCorrectQuestions.map((c)=> {
        return c.topic
    })
    const correct = corr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()) //show totall number of questions
    const correctNo = [...correct.values()]
    // const singleTopicCorrectQeustions = allCorrectQuestions.filter((single ,i) => {
    //     return single.topic == unique[1]
        
    // })


    return (
        <div>
            <Card style={{ width: '100%' }}>
           
                <Card.Body>
               
                    <Table bordered hover variant='success' >
                        <thead>
                            <tr>


                                <th>Topics</th>
                                <th>total questions</th>
                                <th>correct Questions</th>
                                <th>percentage %</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                unique && unique.map((top, i) => {
                                    return <tr>
                                        <td>{top}</td>
                                        <td>{topicNo[i]}</td>
                                        <td>{correctNo[i] ? correctNo[i] : 0}</td>
                                        <td>{(correctNo[i] / topicNo[i]) * 100  ? (correctNo[i] / topicNo[i]) * 100 : 0 } %</td>
                                        <td>{(correctNo[i] / topicNo[i]) * 100 == 100  ? 'excellent':
                                        (correctNo[i] / topicNo[i]) * 100 >= 75  ? 'very good' : 
                                        (correctNo[i] / topicNo[i]) * 100 >= 50    ? 'good' : 
                                        (correctNo[i] / topicNo[i]) * 100 >= 25  ? 'fair':
                                        (correctNo[i] / topicNo[i]) * 100 !=24  ? "too weak":"pass"
                                         
                                        } </td>
                                        

                                    </tr>
                                })
                            }

                        </tbody>
                    </Table>



                </Card.Body>
            </Card>
        </div>
    )
}

export default Ranking