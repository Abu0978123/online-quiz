import React, { useEffect } from 'react'
import { useState } from 'react'
import arrayShuffle from 'array-shuffle'
import { Button } from 'react-bootstrap'


const Question__ = (props) => {
    const [disabled, setDisabled] = useState(false)
    const [allAnswers, setAllAnswers] = useState([])
    

   
    useEffect(() => {
        const temp = props.question.incorrect_options.concat(props.question.correct_option)
        const totalAnswers = arrayShuffle(temp);
        setAllAnswers(totalAnswers)


    }, []);
    const click = (text) => {
        props.attempted()
        setDisabled(true);
        props.setAns(text)
        

        props.getAllResult(text)
        
        
        if (text === props.question.correct_option) {
            props.marks()


        }
    }

    return (
        <div className='question'>
            <h2> <li key={props.key}>{props.question.question}</li></h2>
            <ol>
                {
                    allAnswers.map(oneOption => {
                        return <div>
                            <li>

                                <button type="button" class="btn btn-primary" disabled={disabled} onClick={() => { click(oneOption) }}>{oneOption}</button>


                                <hr></hr>
                            </li>
                        </div>
                    })
                }
            </ol>

        </div>
    )
}

export default Question__
