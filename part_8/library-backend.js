const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { PubSub } = require('apollo-server')


const pubsub = new PubSub()

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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
      type: String,
      required: false,
      minlength: 3
    }
})

const User = mongoose.model('User', userSchema)


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

type Subscription {
  bookAdded: Book!
}

type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int
}

type Token {
  value: String!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  
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
    allBooks: (root, args) => Book.find({}).populate('author'),
    me: (root, args, context) =>  context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        let author = await Author.findOne({ name: { $in: [args.author] } })
        console.log('authoori1', author)
        if (author === null) {
        author = new Author({name: args.author})
        await author.save()
        console.log('authoori2', author)
        }
 
        let book = new Book({
         title: args.title,
         published: args.published,
         author: author,
         genres: args.genres
        })
        await book.save()
        console.log('böök', book)
        pubsub.publish('BOOK_ADDED', { bookAdded: book})
        return book
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },
  editAuthor: async (root, args, context) => {

    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError("not authenticated")
    }

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
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    }, 
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: { 
    bookAdded: { 
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})