import jwt from "jsonwebtoken";
import { data } from "../config.js";
import { AuthenticationError } from "apollo-server-errors";

export const checkAuth = (context) => {
  console.log("context", context.req.headers);
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1].toString();
    if (token) {
      try {
        const user = jwt.verify(token, data.SECRET_KEY);

        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid /expired token");
      }
    }
    throw new Error('Authetication token must be "Beare [token');
  }
  throw new Error("Authorization header must be provided");
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWQxMDY0ZmFjOThmNjZmZDNiZGM0ZSIsImVtYWlsIjoic2lkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiU2lkZGlxdWUiLCJpYXQiOjE2MzkzODIyOTQsImV4cCI6MTYzOTM4NTg5NH0.wwkZ3JNwi3zbvRJU_yDyHazPg9me9tpU6dMYVXsqWC8
