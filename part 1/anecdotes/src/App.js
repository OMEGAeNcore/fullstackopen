import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const setToAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const setToVote = (voted_anecdote) => {
    const handler = () => {
      const updateVote = [...vote]
      updateVote[voted_anecdote] += 1
      setVote([
        ...updateVote
      ])
      console.log(vote)
    }

    return handler
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {vote[selected]} votes
      <br />
      <button onClick={setToVote(selected)}>vote</button>
      <button onClick={setToAnecdote}>next anecdote</button>
    </div>
  )
}
export default App;
