import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addVoteNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
  
    const voteHandler = (anecdote) => {
      dispatch(addVote(anecdote.id))
      dispatch(addVoteNotification({
        ...anecdote, content: `You voted "${anecdote.content}"`
      }))
      
      setTimeout(
        () => dispatch(addVoteNotification({
          ...anecdote, content: ''
        })), 5000
      )
    }

    return (
        <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
