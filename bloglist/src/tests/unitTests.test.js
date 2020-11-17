import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom' 
import Blog from '../components/Blog'
import LikeButton from '../components/LikeButton'
import BlogForm from '../components/BlogForm'

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

      expect(component.container).toHaveTextContent(
        'testUserName'
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
  

  test('BlogForm works', async () => {
    const mockHandler = jest.fn()
  
    const component = render(
        <BlogForm createBlog={mockHandler} />
        )

        const author = component.container.querySelector('#author')
        const title = component.container.querySelector('#title')
        const url = component.container.querySelector('#url')

        const form = component.container.querySelector('form')
      
        fireEvent.change(title, { 
          target: { value: 'testTitle' } 
        })
        fireEvent.change(author, { 
            target: { value: 'testAuthor' } 
          })

          fireEvent.change(url, { 
            target: { value: 'testUrl' } 
          })
  
          


        fireEvent.submit(form)
      
        console.log('mokkigha',mockHandler.mock.calls[0][0])
        expect(mockHandler.mock.calls).toHaveLength(1)

        expect(mockHandler.mock.calls[0][0]).toStrictEqual({title: 'testTitle', author: 'testAuthor', url: 'testUrl'})

  
  })