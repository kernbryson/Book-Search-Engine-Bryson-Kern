const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
    desc: String!
  }
  type User {
    _id: ID!
    username: String
    email: String
    password: String
  }
  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
