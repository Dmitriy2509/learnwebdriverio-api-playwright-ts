import { APIRequestContext } from "@playwright/test";
import { defaultHeaders } from "../../data/headers/headers";

export class User {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createNewUser(request, signInUser) {
    const responseNewUser = await request.post("/api/users", {
      headers: defaultHeaders,
      data: {
        user: {
          username: signInUser.username,
          email: signInUser.email,
          password: signInUser.password,
        },
      },
    });
    return responseNewUser;
  }

  async logInUser(request, loginUser) {
    const responseLoggedInUser = await request.post("/api/users/login", {
      headers: defaultHeaders,
      data: {
        user: {
          email: loginUser.email,
          password: loginUser.password,
        },
      },
    });
    return responseLoggedInUser;
  }

  async updateUser(request, updateUser) {
    const responseUpdatedUser = await request.put("/api/user", {
      data: {
        user: {
          email: updateUser.email,
          username: updateUser.username,
          password: updateUser.password,
          bio: updateUser.bio,
          image: updateUser.image,
        },
      },
    });
    return responseUpdatedUser;
  }
}
