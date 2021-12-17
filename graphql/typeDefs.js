import gql from "graphql-tag";

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
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
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
