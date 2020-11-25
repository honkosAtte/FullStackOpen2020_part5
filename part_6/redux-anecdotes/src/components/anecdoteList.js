import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter).toLowerCase()
    console.log('filteredAnecdotes' , anecdotes.sort((a, b) => b.votes - a.votes).filter(row => row.content.toLowerCase().includes(filter)))
    const dispatch = useDispatch()
  
    const voteHandler = (anecdote) => {
      dispatch(addVote(anecdote))

      dispatch(setNotification(`You voted "${anecdote.content}"`, 5))

    }

    return (
        <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).filter(row => row.content.includes(filter)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
