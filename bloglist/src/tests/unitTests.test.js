import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

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

  expect(component.container).not.toHaveTextContent(
    '100'
  )

  expect(component.container).not.toHaveTextContent(
    'testUrl'
  )
})