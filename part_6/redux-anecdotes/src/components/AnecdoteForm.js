import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created "${content}"`, 5)

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="notification" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = {  createAnecdote, setNotification }

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm