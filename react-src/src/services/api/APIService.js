import axios from "axios";
import AuthStorage from "../auth";
// import qs from 'qs';

export default class APIService {
  static get AuthStorage() {
    return AuthStorage;
  }
  static get server() {
    return process.env.REACT_APP_API_URL || "http://localhost:3000";
    // return ;
  }

  // static objectToQueryString(obj) {
  //   return qs.stringify(obj);
  // }

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
    return axios.post(`${this.server}${url}`, options, {
      headers: {
        Authorization: `Bearer ${this.AuthStorage.getToken("token")}`,
        "Content-Type": "application/json"
      }
    });
  }

  static put(url, options = {}) {
    return axios.put(`${this.server}${url}`, options, {
      headers: {
        Authorization: `Bearer ${this.AuthStorage.getToken("token")}`,
        "Content-Type": "application/json"
      }
    });
  }

  static delete(url, options = {}) {
    return axios.delete(`${this.server}${url}`, {
      headers: {
        Authorization: `Bearer ${this.AuthStorage.getToken("token")}`,
        "Content-Type": "application/json"
      },
      ...options
    });
  }

  static postAuth(url, options = {}) {
    console.log("PostAuth SERVICE has url - ", this.server);
    return axios.post(`${this.server}${url}`, options, {
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  static get(url, query) {
    console.log("GET SERVICE has url - ", this.server);

    return axios.get(
      `${this.server}${url}${
        // query ? `?${this.objectToQueryString(query)}` : ""
        query ? `` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.AuthStorage.getToken("token")}`
        }
      }
    );
  }
}
