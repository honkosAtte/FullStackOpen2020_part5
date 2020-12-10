
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
}

const App = (props) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [myInfo, setMyInfo] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setMyInfo(null)
    props.client.resetStore()
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }



  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        {token !== null ? null :<button onClick={() => setPage('login')}>login</button>}
        {token === null ? null :<button onClick={logout} >logout</button>}
      </div>

      <Authors
        show={page === 'authors'} 
      />

      <Books
        show={page === 'books'}
        token={token}
        myInfo={myInfo}
        setMyInfo={setMyInfo}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        //setError={notify}
      />
     <Recommendations
         show={page === 'recommendations'}
         myInfo={myInfo}
         setMyInfo={setMyInfo}
         tokken={token}
      />

    </div>
  )
}

export default App