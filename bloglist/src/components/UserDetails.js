import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    Redirect
  } from "react-router-dom"

const UserDetails = ({ detailedUser }) =>
{  
  const dispatch = useDispatch()
  console.log('detailed User?', detailedUser)  
  if (detailedUser === undefined) {
    dispatch(setNotification('User not found'))
  }
  return (
    detailedUser ?
  <div>
    <h1>{detailedUser.name}</h1>
    <p><strong>added blogs</strong></p>
  {detailedUser.blogs.map(row => <ul key={row.id}>{row.title}</ul>)}
  </div> :
  <Redirect to='/users' />
)}

export default UserDetails