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
    email: String!
    password: String!
    confirmpassword: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
