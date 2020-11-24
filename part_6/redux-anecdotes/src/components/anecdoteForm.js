import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''
    
    const newObj = {
      content,
      // backend luo id:n
      votes: 0
    }
    
    const newAnecdote = await anecdoteService.createNew(newObj)
    console.log('newAnecdote', newAnecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(addNotification(`You created "${content}"`))
    
    setTimeout(
      () => dispatch(addNotification('')), 5000
    )

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="notification" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm