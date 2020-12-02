import blogService from '../services/blogs'



const blogReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'INIT_BLOGS':
        return action.data
      case 'NEW_LIKE':
        const id = action.data.blog.id
        const blogToChange = state.find(n => n.id === id)
        const changedBlog = { 
          ...blogToChange, votes: blogToChange.votes +1 } 
  
        return state.map(blog =>
          blog.id !== id ? blog : changedBlog)
        
      default:
        return state
    }
  }

export const addNewBlogREDUX = (newBlog) => {
    return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}



export const initializeBlogs = () => {
      return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    }
  }
  

  export default blogReducer
//delete actiondispatcher myös