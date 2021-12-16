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
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  const name = "Peter"
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} />

      <hr />
      
      {left}
      <button onClick={handleLeftClick} >left</button>
      {right}
      <button onClick={handleRightClick} >right</button>
      <p>{allClicks.join(' ')}</p>
    </>
  )
}

export default App;
