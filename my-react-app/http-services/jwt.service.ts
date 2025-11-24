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
//jwt.service.ts này dùng để quản lý JWT token trong localStorage. Nó giúp bạn dễ dàng lưu, lấy và xóa token, phục vụ cho việc xác thực người dùng khi gọi API.
