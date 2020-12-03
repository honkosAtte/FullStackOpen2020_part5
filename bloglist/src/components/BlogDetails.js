import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    Redirect
  } from "react-router-dom"

const BlogDetails = ({ detailedBlog }) =>
{  
  const dispatch = useDispatch()
  console.log('detailed Blog?', detailedBlog)  
  if (detailedBlog === undefined) {
    dispatch(setNotification('Blog not found'))
  }
  return (
    detailedBlog ?
  <div>
    <h1>{detailedBlog.title}</h1>
    <p>url {detailedBlog.url}</p>
    <p>{detailedBlog.likes} likes <button>like</button></p>
    <p>added by {detailedBlog.user.name}</p>
  </div> :
  <Redirect to='/' />
)}

export default BlogDetails