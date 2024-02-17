/* eslint-disable react/prop-types */

const Part = (props) => {
    return (
        <div>
            {props.part.name} {props.part.exercises}
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

const CourseHeader = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
            <CourseHeader name={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )
}


export default Course