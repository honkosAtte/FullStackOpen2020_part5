import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''

   

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created "${content}"`, 5))

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="notification" />
      <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm