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
            <Part part={contentArray[0].part} exercises={contentArray[0].exercises} />
            <Part part={contentArray[1].part} exercises={contentArray[1].exercises} />
            <Part part={contentArray[2].part} exercises={contentArray[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>{props.totalText} {props.totalNumber}</p>
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
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    const contentArray = [
        { part: part1, exercises: exercises1 },
        { part: part2, exercises: exercises2 },
        { part: part3, exercises: exercises3 }
    ];

    const totalString = 'Number of exercises'
    const totalSum = exercises1 + exercises2 + exercises3;

    return (
        <div>
            <Header course={course} />
            <Content contents={contentArray} />
            <Total totalText={totalString} totalNumber={totalSum} />
        </div>
    )
}

export default App