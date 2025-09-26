import test, { APIRequestContext, expect } from "@playwright/test";

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

  async assertRegisterUser(username: string, password: string, email: string) {
    await test.step("User Registration", async () => {
      const response = await this.registerUser(username, password, email);
      expect(response.status()).toBe(201);
      //...
      return response;
    });
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
