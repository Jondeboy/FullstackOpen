/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */



const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => (<Part part={part} key={part.id}/>))}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            {props.part.name} {props.part.exercises}
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

export default App
