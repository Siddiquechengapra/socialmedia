import { Post } from "../../models/Post.js";
import { checkAuth } from "../../utils/checkAuth.js";
import { AuthenticationError, UserInputError } from "apollo-server-errors";
export const commentResolvers = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("POst not found");
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allwoed ");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },

    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //post already likes,unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //not liked ,like post
          post.likes.push({
            username,
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
