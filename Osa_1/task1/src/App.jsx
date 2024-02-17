/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from 'react'

const Header = ({headerText}) => {
    return (
        <div>
            <h1>{headerText}</h1>
        </div>
    )
}

const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}

const StatisticsLine = (props) => (
    <div>{props.text} {props.value}</div>
)

const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <div>
                <StatisticsLine text="Good" value={props.good} />
                <StatisticsLine text="Neutral" value={props.neutral} />
                <StatisticsLine text="Bad" value={props.bad} />

                <StatisticsLine text="All" value={props.all} />
                <StatisticsLine text="Average" value={props.average} />
                <StatisticsLine text="Positive" value={props.positive} />
            </div>
        )
    } else {
        return (
            <div>No feedback given</div>
        )
    }
    
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const average = (good * 1 + neutral * 0 + bad * -1) / all
    const positive = (good / all) * 100 + " %"

    const feedbackHeader = "Give feedback"
    const statisticsHeader = "Statistics"

    return (
        <div>
            <Header headerText={feedbackHeader} />

            <div>
                <Button label="Good" onClick={() => setGood(good + 1)} />
                <Button label="Neutral" onClick={() => setNeutral(neutral + 1)} />
                <Button label="Bad" onClick={() => setBad(bad + 1)} />
            </div>

            <Header headerText={statisticsHeader} />
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
            
        </div>
    )
}

export default App