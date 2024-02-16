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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    const contentArray = [part1, part2, part3];

    const totalString = 'Number of exercises'
    const totalSum = part1.exercises + part2.exercises + part3.exercises;

    return (
        <div>
            <Header course={course} />
            <Content contents={contentArray} />
            <Total totalText={totalString} totalNumber={totalSum} />
        </div>
    )
}

export default App