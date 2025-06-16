import { gql } from "@apollo/client";

export const LIST_POSTS = gql`
  query ListPosts {
    listPosts {
      results {
        id
        content
        title
      }
    }
  }
`;
