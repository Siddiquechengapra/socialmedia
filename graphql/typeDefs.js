import gql from "graphql-tag";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
