import { gql } from "@apollo/client";

// export const CREATE_POST = gql`
//   mutation CreatePost($content: String!, $title: String!, $userId: String!) {
//     createPost(input: { content: $content, title: $title, userId: $userId }) {
//       result {
//         content
//         id
//         title
//       }
//     }
//   }
// `;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      result {
        content
        id
        title
      }
    }
  }
`;
