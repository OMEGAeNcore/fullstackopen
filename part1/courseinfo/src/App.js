import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
    const course = 'Half Stack application development'
    const part = [
        {
            name: 'Fundamentals of React',
            exercise: 10
        },
        {
            name: 'Using props to pass data',
            exercise: 7
        },
        {
            name: 'State of a component',
            exercise: 14
        }
    ]

    return (
        <>
        <Header course={course} />
        <Content content={part} />
        <Total total={part}/>
        </>
    )
}

export default App