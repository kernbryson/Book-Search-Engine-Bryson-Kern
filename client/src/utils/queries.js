import gql from "graphql-tag";
export const currentUserQuery = gql
`{
currentUser{
    _id
    username
    email
    savedBooks {
      bookId
      authors
      image
      description
      title
      link
    }
}
}`