import React, { useState } from 'react'
import { useQuery} from '@apollo/client'
import {ALL_BOOKS} from './queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }


  if (books.loading)  {
    return <div>loading...</div>
  }

  let filterdBooks = []
  let genreArray = []
  let uniqueGenres = []
  if (books.data.allBooks) {
    books.data.allBooks.map(b => b.genres.map(genre => genreArray.push(genre)))
    uniqueGenres = [...new Set(genreArray)]

    if(genre === '') {
      filterdBooks = books.data.allBooks
    }

    if(genre !== '') {
      filterdBooks = books.data.allBooks.filter(x => x.genres.includes(genre))
    }
    
  }

  return (
    <div>
      <h2>books</h2>
   {genre==='' ? <h2>all books</h2> : <h2>in genre: <b>{genre}</b></h2>}
       <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filterdBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
         {uniqueGenres.length === 0 ? null : <div>
           <h2>filter books</h2>
            <button onClick={() => setGenre('')}>remove filters</button>
           {uniqueGenres.map(b => <button key={b} onClick={() => setGenre(b)}>{b}</button>)}</div>}
    </div>
  )
}

export default Books
