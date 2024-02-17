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
                <button onClick={() => setGood(good + 1)}>Good</button>
                <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
                <button onClick={() => setBad(bad + 1)}>Bad</button>
            </div>

            <Header headerText={statisticsHeader} />

            <div>Good {good}</div>
            <div>Neutral {neutral}</div>
            <div>Bad {bad}</div>

            <div>All {all}</div>
            <div>Average {average}</div>
            <div>Positive {positive}</div>
        </div>
    )
}

export default App