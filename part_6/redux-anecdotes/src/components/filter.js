import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)


  const handleChange = (event) => {
    const content = event.target.value
    dispatch(filterChange(content))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter