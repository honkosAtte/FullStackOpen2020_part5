/* eslint-disable linebreak-style */
import React from 'react'
import DeleteButton from './DeleteButton'
import {
  Link
} from "react-router-dom"



const Blog = ({ blog, deleteBlog }) => {

return (
  <div>   
     {<p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link><DeleteButton clickHandler={deleteBlog} id={blog.id}/></p> }
   
   
  </div>
)
}
export default Blog
