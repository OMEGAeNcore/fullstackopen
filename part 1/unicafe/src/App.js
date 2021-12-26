import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const Statistics = (props) => {
  if(props.stats.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <>
      <p>good {props.stats.good}</p>
      <p>neutral {props.stats.neutral}</p>
      <p>bad {props.stats.bad}</p>
      <p>all {props.stats.all}</p>
      <p>average {props.stats.average}</p>
      <p>positive {props.stats.positive} %</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAllReviews] = useState(0)

  const setToGood = () => {
    setAllReviews(allReviews + 1)
    setGood(good + 1)
  }

  const setToNeutral = () => {
    setAllReviews(allReviews + 1)
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setAllReviews(allReviews + 1)
    setBad(bad + 1)
  }

  const average = (good - bad) / allReviews
  const positive = (good / allReviews) * 100

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: allReviews,
    average: average,
    positive: positive
  }


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setToGood} text={'good'} />
      <Button handleClick={setToNeutral} text={'neutral'} />
      <Button handleClick={setToBad} text={'bad'} />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}
export default App;
