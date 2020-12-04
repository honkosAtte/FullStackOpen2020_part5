import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setDeleteBlog, addNewLikeForBlog } from '../reducers/blogReducer'

import {
    Redirect
  } from "react-router-dom"
  import { addNewBlogComment } from '../reducers/blogReducer'


  const Deleteblog = ({id}) => 
  {      
      const dispatch = useDispatch()
  
      const handleDelete = (event) => {
        if (window.confirm(`Delete this blog?`)) { 
          dispatch(setDeleteBlog(id))
        }
      } 
  
        return (
              <button id='deleteBlog' onClick={handleDelete}>delete</button>
              )
  
  }

  const LikeBlog = ({detailedBlog}) => 
  {      
      const dispatch = useDispatch()
  
      const handleLike = (event) => {
        dispatch(addNewLikeForBlog(detailedBlog, detailedBlog.id))
      } 
  
        return (
              <button id='likeBlog' onClick={handleLike}>like</button>
              )
  
  }

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
    dispatch(setNotification('Blog not found or deleted'))
    return <Redirect to='/' />

}
  return (
  <div>
    <h1>{detailedBlog.title}</h1>
    <p>url {detailedBlog.url}</p>
    <p>{detailedBlog.likes} likes <LikeBlog detailedBlog={detailedBlog}/></p><Deleteblog id={detailedBlog.id}/>
    <p>added by {detailedBlog.user.name}</p>
    <BlogCommentForm id={detailedBlog.id}/>
    <h2>comments:</h2>
  {detailedBlog.comments.map(c => <ul key={c.id}>{c.comment}</ul>)}
  </div>
)}

export default BlogDetails