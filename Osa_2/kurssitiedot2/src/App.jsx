/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */



const Course = (props) => {
    return (
        <div>
            <CourseHeader name={props.course.name} />
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

const CourseHeader = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
        </div>
    )
}

const Content = (props) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <div>
            {props.parts.map(part => (<Part part={part} key={part.id} />))}

            <p><b>total of {totalExercises} exercises </b></p>
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

    const courses = [
        {
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
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <Header name="Web development curriculum"/>
            {courses.map(course => (<Course key={course.id} course={course} />))}
        </div>
    )
}

export default App
