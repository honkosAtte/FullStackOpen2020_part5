import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    Redirect
  } from "react-router-dom"
  import { addNewBlogComment } from '../reducers/blogReducer'


const BlogCommentForm = ({id}) => 
{      

    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')

    const handleCommentChange = (event) => {
      setNewComment(event.target.value)
    }
    const addNewComment = (event) => {
      event.preventDefault()
      addBlogCommentDispatch({
        comment: newComment,
        id: id
      }, id)
      setNewComment('')
    }
  
    const addBlogCommentDispatch = (comment, id) => {
        dispatch(addNewBlogComment(comment, id))
        dispatch(setNotification(`Blogcomment with title ${comment} created!`))
      }

      return (
            <form onSubmit={addNewComment}>
            <input id='comment' value={newComment} onChange={handleCommentChange} />
            <button id='submitComment' type='submit'>send new comment</button>
            </form>       
            )

}

const BlogDetails = ({ detailedBlog }) =>
{  
    

  const dispatch = useDispatch()
  if (detailedBlog === undefined || detailedBlog === null) {
    dispatch(setNotification('Blog not found'))
    return <Redirect to='/' />

}
  return (
  <div>
    <h1>{detailedBlog.title}</h1>
    <p>url {detailedBlog.url}</p>
    <p>{detailedBlog.likes} likes <button>like</button></p>
    <p>added by {detailedBlog.user.name}</p>
    <BlogCommentForm id={detailedBlog.id}/>
    <h2>comments:</h2>
  {detailedBlog.comments.map(c => <ul key={c}>{c.comment}</ul>)}
  </div>
)}

export default BlogDetails