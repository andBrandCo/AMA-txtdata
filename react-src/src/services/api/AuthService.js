import APIService from "./APIService";

export default class AuthService extends APIService {
  static login({ email, password }) {
    return AuthService.postAuth("/api/users/login", {
      userName: email,
      password
    });
  }

  static updatePassword({ password, userId, token }) {
    return AuthService.postAuth(
      `/api/users/reset-password/receive-new-password/${userId}/${token}`,
      {
        password
      }
    );
  }

  static recoverPassword({ email }) {
    return AuthService.postAuth(`/api/users/reset-password/user/${email}`);
  }
}
