/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    const contentArray = props.contents
    return (
        <div>
            <Part part={contentArray[0].name} exercises={contentArray[0].exercises} />
            <Part part={contentArray[1].name} exercises={contentArray[1].exercises} />
            <Part part={contentArray[2].name} exercises={contentArray[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    const totalString = 'Number of exercises'

    // Calculate the sum of exercises
    const totalSum = props.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <div>
            <p>{totalString} {totalSum}</p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content contents={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default App