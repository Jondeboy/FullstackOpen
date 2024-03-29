/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'

const Header = ({ headerText }) => {
    return (
        <div>
            <h1>{headerText}</h1>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [votesArray, setVotesArray] = useState(new Array(8).fill(0));
    const [selected, setSelected] = useState(0)

    const maxIndex = votesArray.indexOf(Math.max(...votesArray));
    const maxValue = votesArray[maxIndex];

    const increaseVotes = () => {
        const newVotesArray = [...votesArray]
        newVotesArray[selected] += 1
        setVotesArray(newVotesArray)
    }

    return (
        <div>
            <Header headerText="Anecdote of the day" />
            {anecdotes[selected]}
            <div>has {votesArray[selected]} votes</div>
            <div>
                <button onClick={() => increaseVotes()}>Vote</button>
                <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next anecdote</button>
            </div>
            <Header headerText="Anecdote with the most votes" />
            <div>{anecdotes[maxIndex]}</div>
            <div>has {maxValue} votes</div>
        </div>
    )
}

export default App