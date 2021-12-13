import { User } from "../../models/User.js";
import brcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { data } from "../../config.js";
import { UserInputError } from "apollo-server-errors";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    data.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const userResolvers = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found ";
        throw new UserInputError("User not found", { errors });
      }
      const match = await brcyrpt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmpassword } },
      context,
      info
    ) {

      //validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmpassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //user doesnt exist check
      //hash passoword and create auth token
      password = await brcyrpt.hash(password, 12);
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "this username istaken",
          },
        });
      }
      const newUser = new User({
        email,
        username,
        password,
      });
      const res = await newUser.save(); 
      console.log("res is ", res._doc);
      //   res is  {
      //     username: 'siddique2',
      //     password: '$2a$12$l/pZKjEwVLYIldA6w1I32Oo6Pvm3A6BvfqNo.Y8boVSidbRwx1.9O',
      //     email: 'sid2@gmail.com',
      //     _id: new ObjectId("61ab36eacc34c52e49d55c1b"),
      //     createdAt: 2021-12-04T09:37:46.016Z,
      //     updatedAt: 2021-12-04T09:37:46.016Z,
      //     __v: 0
      //   }

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

  },
};
