/* eslint-disable linebreak-style */
import React, { useState }from 'react'
import LikeButton from './LikeButton'



const Blog = ({ blog }) => {
const [isVisible, setIsVisible] = useState(false)
const handleViewClick = () => {
  setIsVisible(true)
}
const handleCloseViewClick = () => {
  setIsVisible(false)
}

return (
  <div>   
     {isVisible ? <p>{blog.title} {blog.author} {blog.url} {blog.likes} {blog.user.username} <LikeButton clickHandler={() => console.log('pressed like')}/> <button onClick={handleCloseViewClick}>view only title and author</button></p> : 
     <p>{blog.title} {blog.author} <button onClick={handleViewClick}>view all details</button></p>}
   
   
  </div>
)
}
export default Blog
