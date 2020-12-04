/* eslint-disable linebreak-style */
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Link
} from "react-router-dom"



const Blog = ({ blog }) => {

return (
  <div>   
     {<p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p> }
   
   
  </div>
)
}
export default Blog
