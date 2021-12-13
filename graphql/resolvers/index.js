import { postResolvers } from "./posts.js";
import { userResolvers } from "./users.js";

export const resolvers = {
  Query: {...postResolvers.Query},
  Mutation: {...userResolvers.Mutation,...postResolvers.Mutation},
};
 