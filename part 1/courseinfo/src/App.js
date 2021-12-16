import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  return (
    <div>
      <Header course={course} />

      <Content parts={[part1, part2, part3]} exercises={[exercise1, exercise2, exercise3]} />

      <Total exercise1={exercise1} exercise2={exercise2} exercise3={exercise3} />
    </div>
  )
}

export default App;
