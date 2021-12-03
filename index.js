import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import mongoose from "mongoose";
import { data } from "./config.js";
import { Post } from "./models/Post.js";

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(data.MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected 💽");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
