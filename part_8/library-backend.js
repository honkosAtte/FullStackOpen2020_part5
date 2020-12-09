const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

const Book = mongoose.model('Book', bookSchema)



const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number
  }
})

const Author = mongoose.model('Author', authorSchema)

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = process.env.SECRET


mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!] 
  id: ID!
}
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`


const resolvers = {
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: { $in: [root.id] } }).count()
    }
  }
  ,
  Book: {
    author: (root) => {
      return {
        name: root.author.name,
        born: root.author.born,
        id:root.author._id,
        bookCount:root.author.bookCount
      }
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: (root, args) => Author.find({}),
    //allAuthors: (root, args) => Author.deleteMany({}),
    allBooks: (root, args) => { 
      // let result = books
      // let testi = [...books]
      // result = testi.map(row => row = {
      //   ...row, author: {
      //     name:authors.find(a => a.name === row.author).name,
      //     born:authors.find(a => a.name === row.author).born,
      //     id:authors.find(a => a.name === row.author).id,
      //     bookCount:authors.find(a => a.name === row.author).bookCount
      //   }
      // })
      // console.log('Oisko nyt?', result)

      // if (args.genre) {
      
      //   result = result.filter(row => row.genres.includes(args.genre))
      
      // }
      // if (args.author) {

      // result = result.filter(row => row.author === args.author)
      
      // }
  
      result = Book.find({}).populate('author')

      return result
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: { $in: [args.author] } })

        if (author.name !== args.author) {
        author = new Author({name: args.author})
        await author.save()
        }
 
        book = new Book({
         title: args.title,
         published: args.published,
         author: author,
         genres: args.genres
        })
        await book.save()
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }


      return book
    },
  editAuthor: async (root, args) => {
    let authorToBeEdited = await Author.findOne({name: args.name})
    authorToBeEdited.born = args.setBornTo
    try {
      await authorToBeEdited.save()
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }

    return authorToBeEdited
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})