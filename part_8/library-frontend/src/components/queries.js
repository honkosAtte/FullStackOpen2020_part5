import { gql } from '@apollo/client'

export const ME = gql`
query me {
  me  {
    username
    favoriteGenre
  }
}
`  

export const ALL_AUTHORS = gql`
query allAuthors {
  allAuthors  {
    name
    born
    id
    bookCount
  }
}
`  
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
 `

export const ALL_BOOKS = gql`
query allBooks {
  allBooks { 
     title 
     published
     author { name }
     genres
   }
 }
 `

 export const CREATE_BOOK = gql`
 mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
 addBook(
  title: $title
  published: $published
  author: $author
  genres: $ genres
  ){
    title
    published
    author {
     name
     born
     }
    genres
    id
   }
 }
`


export const EDIT_AUTHOR = gql`
mutation editBornYear($name: String!, $setBornTo: Int!) { 
  editAuthor(
    name: $name
    setBornTo: $setBornTo
    ){
    name
    born
  }
}
`
export const BOOK_ADDED = gql`  
subscription { 
bookAdded {
  title 
  published
  author { 
    name
    born
    id
    bookCount
  }
  genres
  id
 }  
}  
 `