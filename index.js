import pkg from "apollo-server";
const { ApolloServer } = pkg;
import mongoose from "mongoose";
import { data } from "./config.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
