  
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [bornYear, setBornYear] = useState('')
  const [authorsName, setAuthorsName] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ] })

    const submit = async (event) => {
      event.preventDefault()
      editAuthor({  variables: { name: authorsName , setBornTo: Number(bornYear) } })
      setBornYear('')
      setAuthorsName('')
    }

  if (!props.show) {
    return null
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }
  let doAllHaveABirthYear = true

  if (!authors.loading) {
  doAllHaveABirthYear = !authors.data.allAuthors.some(row => row.name)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {doAllHaveABirthYear ? null :
      <>
      <form onSubmit={submit}>
      <select value={authorsName} 
        onClick={({target}) => setAuthorsName(target.value)} // tämä!
        onChange={({target}) => setAuthorsName(target.value)}>
        {authors.data.allAuthors.map(a =>
        <option key={a.name} value={a.name}>{a.name}</option>
        )}
      </select>
      <input
      value={bornYear}
      onChange={({ target }) => setBornYear(target.value)}
      />
      <button
      type='submit'
      disabled={authorsName==='' || bornYear.length < 1}
      >update born year</button>
      </form>
      </>}
    </div>
  )
}

export default Authors
