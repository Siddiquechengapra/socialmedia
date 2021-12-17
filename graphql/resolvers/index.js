import { postResolvers } from "./posts.js";
import { userResolvers } from "./users.js";
import { commentResolvers } from "./comments.js";

export const resolvers = {
  Post: {
    likeCount: (parent) => {
      console.log("parent of liekcount  ", parent);
      return parent.likes.length;
    },
    commentCount: (parent) => {
      console.log("aorent of comment count ", parent);
      return parent.comments.length;
    },
  },
  Query: { ...postResolvers.Query },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
