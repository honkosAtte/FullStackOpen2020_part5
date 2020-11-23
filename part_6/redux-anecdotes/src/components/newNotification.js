import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/anecdoteReducer'

const NewNotification = (props) => {
  const dispatch = useDispatch()
  
  const addNotification = (event) => {
    event.preventDefault()
    const content = event.target.notification.value
    event.target.notification.value = ''
    dispatch(createNotification(content))
  }

  return (
    <form onSubmit={addNotification}>
      <input name="notification" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNotification