import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $username: String!
    $fullname: String!
  ) {
    signUp(
      input: {
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
        username: $username
        fullname: $fullname
      }
    ) {
      result {
        id
      }
    }
  }
`;
