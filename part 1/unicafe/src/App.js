import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>
    {text}
  </button>
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


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setToGood} text={'good'} />
      <Button handleClick={setToNeutral} text={'neutral'} />
      <Button handleClick={setToBad} text={'bad'} />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allReviews}</p>
      <p>average {allReviews === 0 ? 0 : average}</p>
      <p>positive {allReviews === 0 ? 0 : positive} %</p>
    </div>
  )
}
export default App;
