import APIService from "./APIService";

export default class AuthService extends APIService {
  static login({ email, password }) {
    return AuthService.postAuth("/api/users/login", {
      userName: email,
      password
    });
  }
}
