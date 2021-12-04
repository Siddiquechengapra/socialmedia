import { User } from "../../models/User.js";
import brcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import { data } from "../../config.js";
export const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmpassword } },
      context,
      info
    ) {
      //validate user data
      //user doesnt exist check
      //hash passoword and create auth token
      password = await brcyrpt.hash(password, 12);
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

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        data.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
