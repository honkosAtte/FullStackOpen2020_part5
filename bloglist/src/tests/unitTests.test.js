import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import Blog from '../components/Blog'
import LikeButton from '../components/LikeButton'

test('Blog renders author, title, but not likes', () => {
  const blog = {
        author: 'Test',
        title: 'TestTitle',
        likes: 100,
        url: 'testUrl'
     }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Test'
  )
  expect(component.container).toHaveTextContent(
    'TestTitle'
  )

  expect(component.container).not.toHaveTextContent(
    '100'
  )

  expect(component.container).not.toHaveTextContent(
    'testUrl'
  )
})

test('Blog renders all the details when show details button pressed', () => {
    const blog = {
          author: 'Test',
          title: 'TestTitle',
          likes: 100,
          url: 'testUrl',
          user : { username : 'testUserName' }
       }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    const button = component.getByText('view all details')
    fireEvent.click(button)



    expect(component.container).toHaveTextContent(
      'Test'
    )
  
    expect(component.container).toHaveTextContent(
      'TestTitle'
    )

    expect(component.container).toHaveTextContent(
        '100'
      )

      expect(component.container).toHaveTextContent(
        'testUrl'
      )

  })

  test('clicking the LikeButton twice calls event handler twice', async () => {
    // A separate LikeButton component, which is used by Blog component. Is it wrong?
    const mockHandler = jest.fn()
  
    const component = render(
        <LikeButton clickHandler={mockHandler} />
        )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  
