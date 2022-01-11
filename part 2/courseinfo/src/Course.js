import React from "react"

const Header = ({ course }) => {
return (
    <h1>{course.name}</h1>
)
}

const Total = ({ course }) => {
const sum = course.parts.reduce((a, b) => a + b.exercises, 0)
return(
    <b>total of {sum} exercises</b>
) 
}

const Part = (props) => {
return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>    
)
}

const Content = ({ course }) => {
return (
    <div>
    {
        course.parts.map((id, key) => (
        <Part key={key} part={id} />
        ))
    }
    </div>
)
}

const Course = ({ course }) => {
return (
    <div>
    {
        course.map((id, key) => (
            <div key={id.name}>
            <Header course={id} />
            <Content course={id} />
            <Total course={id} />
            </div>
        )
        )
    }
    </div>
)
}

export default Course;