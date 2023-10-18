import axios, { AxiosError } from "axios";
import API_BASE_URL from "@src/apiConfig";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { NewPasswordModel } from "@src/shared/models/NewPasswordModel";
import { LoginModel } from "@src/shared/models/LoginModel";
import { authHeaderGenerator } from "./authHeaderGenerator";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const loginService = {
  setCookie(name: string, value: string, minutes: number) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + minutes * 60 * 1000); // Add minutes in milliseconds
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  },

  getCookie(name: string) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return undefined;
  },

  async login(data?: LoginModel) {
    try {
      const response = await instance.post(`/Login/login`, data);

      const expirationMinutes = 300;
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + expirationMinutes * 60 * 1000
      );

      Cookies.set("jwtToken", response.data, { expires: expirationDate });

      const claims = jwt(response.data);
      const role =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const email =
        claims[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];
      const handle =
        claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      this.setCookie("userRole", role, 30);
      this.setCookie("userEmail", email, 30);
      this.setCookie("userHandle", handle, 30);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async logout() {
    try {
      const headers = authHeaderGenerator.getAuthHeader();

      const response = await instance.post("/Login/logout", null, { headers });

      document.cookie =
        "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userHandle=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(data: UserDetailModel) {
    try {
      const response = await instance.post(`/User/add`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async forgot(email?: string) {
    try {
      const response = await instance.post(`/Login/forgot?email=` + email);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async newPassword(data?: NewPasswordModel) {
    try {
      const response = await instance.put(`/Login/newPassword`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
