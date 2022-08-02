import { gql } from "@apollo/client";
export const currentUserQuery = gql`
  {
    currentUser {
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
  }
`;
