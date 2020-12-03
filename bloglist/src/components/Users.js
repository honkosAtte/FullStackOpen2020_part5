import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from "react-router-dom"

const Users = () => {
  const users = useSelector(state => state.users)
  console.log(' Hello from users', users)
  return (
    <div>
        <h1>Users</h1>
      {
        users === null ?
          <div></div> :


          <table>
              <tbody>
            <tr>
            <th></th><th>blogs created</th>
            </tr>
            {users.map(row => <tr key={row.id}><td><Link to={`/users/${row.id}`}>{row.name}</Link></td><td>{row.blogs.length}</td></tr>)}
            </tbody>
          </table>
      }
    </div>
  )
}


export default Users