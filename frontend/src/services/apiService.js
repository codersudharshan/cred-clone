import { API_ENDPOINTS } from "../config/api";

class ApiService {
  constructor() {
    this.token = localStorage.getItem("authToken");
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem("authToken");
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async handleResponse(response) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async login(email, password) {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse(response);

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async register(userData) {
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    return await this.handleResponse(response);
  }

  async getProfile() {
    const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
      headers: this.getHeaders(),
    });
    return await this.handleResponse(response);
  }
}

export default new ApiService();
