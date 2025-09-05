import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;
  readonly apiUrl = "http://localhost:3000";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(username: string, password: string, email: string) {
    const response = await this.request.post(`${this.apiUrl}/user/register`, {
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  }

  async loginUser(username: string, password: string) {
    const response = await this.request.post(`${this.apiUrl}/auth/login`, {
      data: {
        username,
        password,
      },
    });
    return response;
  }
}
