/** @format */


export class JwtService {
  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  static clearToken() {
    localStorage.removeItem("token");
  }
}
