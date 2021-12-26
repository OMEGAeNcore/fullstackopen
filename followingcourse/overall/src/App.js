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

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [ left, setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [allClicks, setAll] = useState([])
  const [ value, setValue ] = useState(10)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const hello = (who) => {
    const handler = () => console.log('hello ', who)
    return handler
  }

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  const name = "Peter"
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} />

      <hr />
      
      <Display counter={left} />
      <Button handleClick={handleLeftClick} text='left' />
      <Display counter={right} />
      <Button handleClick={handleRightClick} text='right' />
      <History allClicks={allClicks} />

      <hr />

      {value}
      <button onClick={setToValue(1000)} >1000</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </>
  )
}

export default App;
