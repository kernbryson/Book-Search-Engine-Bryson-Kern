const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }
  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: SearchedBook!): User
    removeBook(bookId: ID!): User
  }

  type Query {
    currentUser: User
  }
  input SearchedBook {
    authors: [String]
    description: String!
    link: String
    title: String!
    bookId: String!
    image: String
  }
`;

module.exports = typeDefs;
