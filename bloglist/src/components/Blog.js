/* eslint-disable linebreak-style */
import React, { useState }from 'react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, deleteBlog }) => {
const [isVisible, setIsVisible] = useState(false)
const handleViewClick = () => {
  setIsVisible(true)
}
const handleCloseViewClick = () => {
  setIsVisible(false)
}

return (
  <div>   
     {isVisible ? <p>{blog.title} {blog.author} {blog.url} {blog.likes} {blog.user.username} <LikeButton clickHandler={() => console.log('pressed like')}/> <DeleteButton clickHandler={deleteBlog} id={blog.id}/>
 <button onClick={handleCloseViewClick}>view only title and author</button></p> : 
     <p>{blog.title} {blog.author} <button id='viewAllDetailsButton' onClick={handleViewClick}>view all details</button></p>}
   
   
  </div>
)
}
export default Blog
