import axios from "axios";
import AuthStorage from "../auth";

export default class APIService {
  static get AuthStorage() {
    return AuthStorage;
  }
  static get server() {
    return process.env.REACT_APP_API_URL || "";
    // return ;
  }
  static get defaultHeaders() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.AuthStorage.isAuthenticated()) {
      headers.Authorization = `Bearer ${this.AuthStorage.getToken()}`;
    }

    return headers;
  }

  static post(url, options = {}) {
    return axios.post(`${url}`, options, {
      headers: {
        Authorization: `Bearer ${this.AuthStorage.getToken()}`,
        "Content-Type": "application/json"
      }
    });
  }

  static postAuth(url, options = {}) {
    return axios.post(`http://localhost:3000/${url}`, options, {
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
}
