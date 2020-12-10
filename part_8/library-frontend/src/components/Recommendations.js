import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import {ALL_BOOKS, ME} from './queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [getMe, result] = useLazyQuery(ME, { fetchPolicy: "network-only" })
const getMyInfoFromServer = () => getMe()


  useEffect(() => {
 
    if (result.data) 
    { 

      props.setMyInfo(result.data.me)} 

    }, 
    [result])

  if (result && result.data && result.data.me) {
    props.setMyInfo(result.data.me)
  }

  if (!props.show) {
    return null
  }


  if (books.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
    <h2>recommendations</h2>     
    {props.tokken === null ? null : <button onClick={getMyInfoFromServer}>reveal our recommendations based on your favorite genre</button>}
    
    {props.myInfo === null ? null :
        <div>
  
  <p><b>{props.myInfo.username}</b>, these items are found in your favorite genre  <b>{props.myInfo.favoriteGenre}</b>:</p>
  {books.data.allBooks.filter(x => x.genres.includes(props.myInfo.favoriteGenre)).length  === 0? <p>nothing found :(</p> :
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
  {books.data.allBooks.filter(x => x.genres.includes(props.myInfo.favoriteGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
                  </tbody>
      </table>}
  </div>
  }
     </div>
  )
}

export default Books