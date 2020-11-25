import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const anecdotesToShow = () => {    
     if ( props.anecdotesFilter === '') 
   {      return props.anecdotes    }        
   return props.anecdotes.filter(row => row.content.includes(props.anecdotesFilter))
   }
   
  
    const voteHandler = (anecdote) => {
      props.addVote(anecdote)

      props.setNotification(`You voted "${anecdote.content}"`, 5)

    }

    return (
        <div>
      {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    anecdotesFilter: state.filter,
  }
}

const mapDispatchToProps = {  addVote, setNotification }


const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
