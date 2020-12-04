import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setDeleteBlog, addNewLikeForBlog } from '../reducers/blogReducer'
import { Redirect } from "react-router-dom"
import { addNewBlogComment } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
  background: Cyan;
  font-size: 3em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Orange;
  border-radius: 7px;
`

const Input = styled.input`
  margin: 0.25em;
  background: Cyan;
  font-size: 3em;
`

  const Deleteblog = ({id}) => 
  {      
    const currentUserFromRedux = useSelector(state => state.currentUser)

      const dispatch = useDispatch()
  
      const handleDelete = (event) => {
        if (window.confirm(`Delete this blog?`)) { 
          dispatch(setDeleteBlog(id))
        }
      } 
  
        return (
          
            currentUserFromRedux === null ? null :
              <Button id='deleteBlog' onClick={handleDelete}>delete</Button>
            
              )
  
  }

  const LikeBlog = ({detailedBlog}) => 
  {      
      const dispatch = useDispatch()
  
      const handleLike = (event) => {
        dispatch(addNewLikeForBlog(detailedBlog, detailedBlog.id))
      } 
  
        return (
              <Button id='likeBlog' onClick={handleLike}>like</Button>
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
      let kommentti = '_' 
      if (newComment === '') {
      window.alert(`An empty comment will be displayed as _`)
      }
      event.preventDefault()
      if (newComment !== '')
      {
        kommentti = newComment
      }
      addBlogCommentDispatch({
        comment: kommentti,
        id: id
      }, id)
      setNewComment('')
    }
  
    const addBlogCommentDispatch = (comment, id) => {
        dispatch(addNewBlogComment(comment, id))
        dispatch(setNotification(`New blogcomment with title created!`))
      }

      return (
            <form onSubmit={addNewComment}>
            <Input id='comment' value={newComment} onChange={handleCommentChange} />
            
            <Button id='submitComment' type='submit'>send new comment</Button>
            
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
  {detailedBlog.comments.length !== 0 ? detailedBlog.comments.map(c => <li key={c.id}>{c.comment}</li>) : null}
  </div>
)}

export default BlogDetails