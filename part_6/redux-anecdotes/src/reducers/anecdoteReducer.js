
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_VOTE':
      const id = action.data.anecdote.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, votes: anecdoteToChange.votes +1 } 

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
      
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  const newObj = {
    content,
    // backend luo id:n
    votes: 0
  }
  
  return async dispatch => {
  const newAnecdote = await anecdoteService.createNew(newObj)
  console.log('newAnecdote', newAnecdote)

  dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote
  })}
}

export const addVote = (anecdote) => {
  return async dispatch => {
    
const votedAnecdote = {...anecdote, votes : anecdote.votes +1}

const updatedAnecdote = await anecdoteService.updateVotes(votedAnecdote)


   dispatch({ type: 'NEW_VOTE',
    data: { anecdote }
  })
}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer