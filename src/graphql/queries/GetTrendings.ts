import { gql } from "@apollo/client";

export const GET_TRENDINGS = gql`
  query GetTrendings {
    getTrendings
  }
`;
