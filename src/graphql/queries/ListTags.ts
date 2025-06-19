import { gql } from "@apollo/client";

export const LIST_TAGS = gql`
  query ListTags {
    listTags {
      results {
        id
        description
      }
    }
  }
`;
