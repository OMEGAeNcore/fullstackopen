import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const StatisticLine = ({ text, value }) => {
  if (text === "positive"){
    return (
      <tr>
        <td> {text} </td>
        <td> {value} % </td>
      </tr>
    )
  }
  return (
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
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

  if(allReviews === 0) {
    return (
      <>
        <h2>give feedback</h2>
        <Button handleClick={setToGood} text={'good'} />
        <Button handleClick={setToNeutral} text={'neutral'} />
        <Button handleClick={setToBad} text={'bad'} />
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={setToGood} text={'good'} />
      <Button handleClick={setToNeutral} text={'neutral'} />
      <Button handleClick={setToBad} text={'bad'} />
      <h2>statistics</h2>
      <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allReviews} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </table>
    </div>
  )
}
export default App;
