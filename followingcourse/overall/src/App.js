import React, { useState } from "react";

const Hello = ( { name, age } ) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()} </p>
    </>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ clicks, setClicks ] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      left: clicks.left + 1
    })
  }

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    })
  }
  const name = "Peter"
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} />

      <hr />
      
      {clicks.left}
      <button onClick={handleLeftClick} >left</button>
      {clicks.right}
      <button onClick={handleRightClick} >right</button>
    </>
  )
}

export default App;
