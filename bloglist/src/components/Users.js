import React from 'react'
import { useSelector } from 'react-redux'


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
            {users.map(row => <tr key={row.id}><td>{row.name}</td><td>{row.blogs.length}</td></tr>)}
            </tbody>
          </table>
      }
    </div>
  )
}


export default Users