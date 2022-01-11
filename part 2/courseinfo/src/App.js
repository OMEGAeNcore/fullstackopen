import React from 'react'

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
const App = () => {
  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
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

  return <Course course={course} />
}

export default App;
